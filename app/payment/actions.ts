'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SupabaseOrderRepository } from '@/src/infrastructure/external/SupabaseOrderRepository'
import { SupabaseUserRepository } from '@/src/infrastructure/external/SupabaseUserRepository'
import { InitiatePaymentUseCase } from '@/src/application/use-cases/InitiatePaymentUseCase'
import { UpdateOrderStatusUseCase } from '@/src/application/use-cases/UpdateOrderStatusUseCase'
import { getNextBillingDateKST } from '@/src/utils/dateUtils'

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
      },
    }
  )
}

function getTossHeaders() {
  const secretKey = process.env.TOSS_SECRET_KEY || "";
  return {
    Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
    "Content-Type": "application/json",
  };
}

export async function issueBillingKeyAndPay(userId: string, customerKey: string, authKey: string) {
  const supabase = await getSupabase();
  const userRepository = new SupabaseUserRepository(supabase);
  const orderRepository = new SupabaseOrderRepository(supabase);

  // 1. 빌링키 발급 요청
  const issueRes = await fetch("https://api.tosspayments.com/v1/billing/authorizations/issue", {
    method: "POST",
    headers: getTossHeaders(),
    body: JSON.stringify({ authKey, customerKey }),
  });

  if (!issueRes.ok) {
    const errorData = await issueRes.json();
    throw new Error(`빌링키 발급 실패: ${errorData.message}`);
  }

  const issueData = await issueRes.json();
  const billingKey = issueData.billingKey;

  // 2. 빌링키를 DB에 저장
  await userRepository.saveBillingKey(userId, customerKey, billingKey);

  // 3. 첫 결제(50,000원) 실행을 위한 PENDING 주문 생성
  const useCase = new InitiatePaymentUseCase(orderRepository);
  const amount = 50000;
  const orderName = "Pro 플랜 정기결제";
  const order = await useCase.execute(userId, orderName, amount);

  // 4. 빌링키로 결제 승인 요청
  const payRes = await fetch(`https://api.tosspayments.com/v1/billing/${billingKey}`, {
    method: "POST",
    headers: getTossHeaders(),
    body: JSON.stringify({
      customerKey,
      orderId: order.orderId,
      amount,
      orderName,
    }),
  });

  if (!payRes.ok) {
    const errorData = await payRes.json();
    // 실패 시 주문 상태 FAILED로 변경
    const updateUseCase = new UpdateOrderStatusUseCase(orderRepository);
    await updateUseCase.execute(order.orderId, 'FAILED');
    throw new Error(`정기결제 승인 실패: ${errorData.message}`);
  }

  const payData = await payRes.json();

  // 5. 결제 성공 시 주문 상태 DONE 및 유저 플랜 PRO로 업데이트, 다음 결제일 KST 기준 30일 뒤 00:00으로 설정
  const updateUseCase = new UpdateOrderStatusUseCase(orderRepository);
  await updateUseCase.execute(order.orderId, 'DONE');
  await userRepository.updateUserPlan(userId, "pro");

  const nextDate = getNextBillingDateKST();
  await userRepository.updateNextBillingDate(userId, nextDate);

  return {
    orderId: payData.orderId,
    orderName: payData.orderName,
    amount: payData.totalAmount,
  };
}

export async function initiatePayment(orderName: string, amount: number) {
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('결제를 진행하려면 로그인이 필요합니다.')
  }

  const orderRepo = new SupabaseOrderRepository(supabase)
  const useCase = new InitiatePaymentUseCase(orderRepo)

  const order = await useCase.execute(user.id, orderName, amount)
  return order
}

export async function cancelPayment(orderId: string) {
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다.')
  }

  const orderRepo = new SupabaseOrderRepository(supabase)
  const useCase = new UpdateOrderStatusUseCase(orderRepo)

  await useCase.execute(orderId, 'CANCELLED')
}

export async function failPayment(orderId: string) {
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다.')
  }

  const orderRepo = new SupabaseOrderRepository(supabase)
  const useCase = new UpdateOrderStatusUseCase(orderRepo)

  await useCase.execute(orderId, 'FAILED')
}

export async function cancelSubscription() {
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('로그인이 필요합니다.')
  }

  // 빌링키를 삭제하여 자동 결제를 중단시킴 (플랜은 유지됨)
  // userRepository.saveBillingKey 등을 재사용하거나 직접 update 수행
  const { error } = await supabase
    .from("users")
    .update({ billing_key: null })
    .eq("id", user.id)

  if (error) {
    throw new Error(`구독 취소 실패: ${error.message}`)
  }

  return { success: true }
}
