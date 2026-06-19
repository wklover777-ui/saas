"use client";

import { useEffect, useState } from "react";
import { loadTossPayments, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || "";

export default function PaymentWidget({ userCustomerKey }: { userCustomerKey: string }) {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initTossPayments() {
      if (!clientKey) {
        console.error("Toss client key is missing!");
        return;
      }
      try {
        const tossPayments = await loadTossPayments(clientKey);
        // 빌링(정기결제)은 payment 객체를 사용합니다.
        const p = tossPayments.payment({ customerKey: userCustomerKey });
        setPayment(p);
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize Toss Payments:", error);
      }
    }

    initTossPayments();
  }, [userCustomerKey]);

  const handleBillingAuth = async () => {
    if (!payment) return;

    try {
      // 빌링 결제를 위한 인증(카드 등록) 요청
      await payment.requestBillingAuth({
        method: "CARD", // 빌링은 카드 결제만 지원 (현재 토스페이먼츠 기준)
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
        customerEmail: "customer123@example.com", // 실제 서비스에서는 유저 이메일을 받아와야 합니다.
        customerName: "홍길동", // 실제 유저 이름
      });
    } catch (error: any) {
      console.error("Billing auth failed:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">정기결제 카드 등록</h2>
      <p className="text-gray-600 mb-6">
        한 번 카드를 등록하시면 매월 자동으로 결제가 진행됩니다. (기본 금액 50,000원)
      </p>
      <button
        onClick={handleBillingAuth}
        disabled={!isReady}
        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded disabled:bg-gray-400 hover:bg-blue-700 transition"
      >
        {isReady ? "카드 등록하기" : "결제 모듈 불러오는 중..."}
      </button>
    </div>
  );
}
