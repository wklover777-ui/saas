import Link from "next/link";
import { createClient } from "../../../src/infrastructure/supabase/server";
import { SupabaseUserRepository } from "../../../src/infrastructure/external/SupabaseUserRepository";
import { issueBillingKeyAndPay } from "../actions";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ authKey: string; customerKey: string }>;
}) {
  const params = await searchParams;
  const { authKey, customerKey } = params;

  if (!authKey || !customerKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">잘못된 접근</h1>
          <p className="text-gray-600 mb-6">카드 등록 정보가 올바르지 않습니다.</p>
          <Link href="/payment" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            다시 시도하기
          </Link>
        </div>
      </div>
    );
  }

  let paymentResult = null;
  let errorMsg = null;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("결제 승인을 위해 로그인이 필요합니다.");
    }

    // 서버 액션을 호출하여 빌링키를 발급받고, 첫 결제를 승인합니다.
    paymentResult = await issueBillingKeyAndPay(user.id, customerKey, authKey);
  } catch (error: any) {
    errorMsg = error.message || "카드 등록 및 결제 승인 중 오류가 발생했습니다.";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        {paymentResult ? (
          <>
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">정기결제 카드 등록 완료!</h1>
            <p className="text-gray-600 mb-6">첫 결제가 성공적으로 처리되었습니다. 이후 매월 30일 간격으로 자동 결제됩니다.</p>
            
            <div className="text-left bg-gray-50 p-4 rounded-md mb-6 text-sm">
              <p className="mb-2"><span className="text-gray-500 w-24 inline-block">주문명</span> <span className="font-medium text-gray-800">{paymentResult.orderName}</span></p>
              <p className="mb-2"><span className="text-gray-500 w-24 inline-block">주문번호</span> <span className="font-medium text-gray-800">{paymentResult.orderId}</span></p>
              <p className="mb-2"><span className="text-gray-500 w-24 inline-block">결제금액</span> <span className="font-medium text-gray-800">{paymentResult.amount.toLocaleString()}원</span></p>
            </div>

            <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition">
              홈으로 가기
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-red-600 mb-2">결제 승인 실패</h1>
            <p className="text-gray-600 mb-6">{errorMsg}</p>
            <Link href="/payment" className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition">
              다시 시도하기
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
