'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cancelSubscription } from '@/app/payment/actions'

interface SubscriptionManagerProps {
  userName: string;
  plan: string;
  hasBillingKey: boolean;
  nextBillingDate?: string;
}

export function SubscriptionManager({ userName, plan, hasBillingKey, nextBillingDate }: SubscriptionManagerProps) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    setIsCancelling(true)
    try {
      await cancelSubscription()
      setIsModalOpen(false)
      router.refresh()
    } catch (error: any) {
      alert(`오류가 발생했습니다: ${error.message}`)
    } finally {
      setIsCancelling(false)
    }
  }

  // 날짜 포맷 (YYYY.MM.DD)
  const formattedDate = nextBillingDate 
    ? new Date(nextBillingDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\./g, '.').replace(/ /g, '')
    : '-';

  return (
    <div className="flex flex-col w-full max-w-2xl text-on-surface">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-1">안녕하세요, {userName}님!</h2>
        <p className="text-on-surface-variant text-sm">
          현재 <span className="capitalize">{plan}</span> 플랜을 이용 중입니다
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-6">구독 현황</h3>
        
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/50">
            <span className="text-on-surface-variant text-sm">다음 결제일</span>
            <span className="font-medium text-sm">{formattedDate}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/50">
            <span className="text-on-surface-variant text-sm">월 결제 금액</span>
            <span className="font-medium text-sm">50,000원</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/50">
            <span className="text-on-surface-variant text-sm">결제 수단</span>
            <span className="font-medium text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
              {hasBillingKey ? '등록된 자동결제 수단' : '없음 (취소됨)'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex-1 bg-surface-container-highest hover:bg-surface-container-highest/80 text-on-surface py-3 rounded-lg font-medium text-sm transition-colors">
            플랜 변경
          </button>
          
          {plan === 'pro' && hasBillingKey ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-surface-container-lowest border border-primary text-primary hover:bg-primary/5 py-3 rounded-lg font-medium text-sm transition-colors"
            >
              구독 취소
            </button>
          ) : plan === 'pro' && !hasBillingKey ? (
            <button disabled className="flex-1 bg-surface-container-lowest border border-error/50 text-error/80 py-3 rounded-lg font-medium text-sm opacity-60 cursor-not-allowed">
              취소 진행 중 (만료 대기)
            </button>
          ) : null}
        </div>
      </div>

      {/* 구독 취소 커스텀 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-3">구독을 취소하시겠습니까?</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
              구독을 취소하더라도 다음 결제일 전까지는 서비스를 계속 이용하실 수 있습니다.<br/>
              이후에는 자동 결제가 진행되지 않으며 서비스 이용이 제한됩니다.
            </p>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={isCancelling}
                className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
              >
                돌아가기
              </button>
              <button
                onClick={handleCancel}
                disabled={isCancelling}
                className="px-4 py-2 text-sm font-medium bg-[#1e293b] text-white hover:bg-[#0f172a] rounded-lg transition-colors disabled:opacity-50"
              >
                {isCancelling ? '처리 중...' : '네, 구독 취소합니다'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
