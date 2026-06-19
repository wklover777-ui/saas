import { User } from "../entities/User";

export interface UserRepository {
  /**
   * 유저의 구독 플랜을 업데이트합니다.
   * @param userId 업데이트할 유저의 고유 ID
   * @param plan 변경할 플랜 ('free' | 'pro' | 'business')
   */
  updateUserPlan(userId: string, plan: "free" | "pro" | "business"): Promise<void>;

  /**
   * 유저의 빌링키와 커스터머키를 저장합니다.
   * @param userId 업데이트할 유저의 고유 ID
   * @param customerKey 토스페이먼츠 customerKey
   * @param billingKey 토스페이먼츠 billingKey
   */
  saveBillingKey(userId: string, customerKey: string, billingKey: string): Promise<void>;

  /**
   * 유저 정보를 조회합니다.
   * @param userId 유저의 고유 ID
   */
  getUser(userId: string): Promise<User | null>;

  /**
   * 오늘 결제해야 하는(결제일이 지났거나 당일인) 모든 유저를 조회합니다.
   * @param date 기준 날짜 (기본값: 현재 시간)
   */
  getUsersToBillToday(date?: Date): Promise<User[]>;

  /**
   * 유저의 다음 결제일을 업데이트합니다.
   * @param userId 유저 ID
   * @param nextBillingDate 다음 결제일
   */
  updateNextBillingDate(userId: string, nextBillingDate: Date): Promise<void>;
}
