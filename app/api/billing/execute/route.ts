import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SupabaseUserRepository } from "@/src/infrastructure/external/SupabaseUserRepository";
import { ProcessDailyBillingUseCase } from "@/src/application/use-cases/ProcessDailyBillingUseCase";
import { BillingGateway } from "@/src/domain/repositories/BillingGateway";

function getTossHeaders() {
  const secretKey = process.env.TOSS_SECRET_KEY || "";
  return {
    Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString("base64")}`,
    "Content-Type": "application/json",
  };
}

class TossBillingGateway implements BillingGateway {
  async executeBilling(customerKey: string, billingKey: string, amount: number, orderId: string, orderName: string): Promise<boolean> {
    const payRes = await fetch(`https://api.tosspayments.com/v1/billing/${billingKey}`, {
      method: "POST",
      headers: getTossHeaders(),
      body: JSON.stringify({
        customerKey,
        orderId,
        amount,
        orderName,
      }),
    });

    if (!payRes.ok) {
      const errorData = await payRes.json();
      throw new Error(`Toss Billing API Error: ${errorData.message}`);
    }

    return true;
  }
}

export async function POST(request: Request) {
  try {
    // Vercel Cron 등에서는 보안 토큰(Cron Secret) 검증이 필요할 수 있습니다.
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("서버 환경 변수에 SUPABASE_SERVICE_ROLE_KEY가 설정되지 않았습니다. 관리자 권한이 필요합니다.");
    }

    // 크론잡은 로그인된 사용자가 아니므로, RLS(보안 정책)를 우회할 수 있는 '서비스 롤 키(관리자 키)'를 사용해야 모든 유저를 조회할 수 있습니다.
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    const userRepository = new SupabaseUserRepository(supabaseAdmin);
    const billingGateway = new TossBillingGateway();

    const useCase = new ProcessDailyBillingUseCase(userRepository, billingGateway);
    const result = await useCase.execute();

    return NextResponse.json({
      success: true,
      data: result,
      message: "일괄 정기결제가 성공적으로 처리되었습니다."
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Vercel Cron Job은 기본적으로 GET 요청을 보냅니다.
export async function GET(request: Request) {
  return POST(request);
}
