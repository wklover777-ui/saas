import Link from "next/link";
import { failPayment } from "../actions";

export default async function FailPage({
  searchParams,
}: {
  searchParams: Promise<{ code: string; message: string; orderId: string }>;
}) {
  const params = await searchParams;
  const { code, message, orderId } = params;

  if (orderId) {
    try {
      await failPayment(orderId);
    } catch (e) {
      console.error("Failed to update order status to FAILED:", e);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">결제 실패</h1>
        <p className="text-gray-600 mb-6">
          결제 진행 중 문제가 발생했습니다.
        </p>

        <div className="text-left bg-red-50 p-4 rounded-md mb-6 text-sm">
          <p className="mb-2"><span className="text-red-800 font-medium">에러 코드:</span> {code || "알 수 없음"}</p>
          <p className="mb-2"><span className="text-red-800 font-medium">에러 메시지:</span> {message || "알 수 없는 오류가 발생했습니다."}</p>
          {orderId && <p><span className="text-red-800 font-medium">주문 번호:</span> {orderId}</p>}
        </div>

        <Link href="/payment" className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition w-full inline-block">
          다시 시도하기
        </Link>
      </div>
    </div>
  );
}
