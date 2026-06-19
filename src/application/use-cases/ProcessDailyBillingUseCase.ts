import { UserRepository } from '../../domain/repositories/UserRepository';
import { BillingGateway } from '../../domain/repositories/BillingGateway';
import { getNextBillingDateKST } from '../../utils/dateUtils';

export class ProcessDailyBillingUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly billingGateway: BillingGateway
  ) {}

  async execute() {
    // 1. 오늘 결제해야 하는(next_billing_date <= 오늘) 사용자 목록 조회
    const users = await this.userRepository.getUsersToBillToday(new Date());

    let successCount = 0;
    let failCount = 0;

    // 2. 각 사용자에 대해 결제 또는 권한 만료 처리
    for (const user of users) {
      if (!user.billingKey) {
        // 빌링키가 없다는 것은 구독을 취소한 사용자임.
        // 다음 결제일(만료일)이 도래했으므로 플랜을 free로 강등시킴.
        console.log(`User ${user.id} subscription expired. Downgrading to free plan.`);
        await this.userRepository.updateUserPlan(user.id, "free");
        successCount++; // 정상적인 만료 처리이므로 성공으로 간주
        continue;
      }

      if (!user.customerKey) {
        failCount++;
        continue;
      }

      try {
        const orderId = `auto-bill-${user.id}-${Date.now()}`;
        const amount = 50000;
        const orderName = "Pro 플랜 정기결제 (갱신)";

        // 3. 결제 요청 (예외 발생 시 catch로 이동)
        await this.billingGateway.executeBilling(
          user.customerKey,
          user.billingKey,
          amount,
          orderId,
          orderName
        );

        // 4. 결제 성공 시 다음 결제일 KST 기준 30일 뒤 00:00으로 연장
        const nextDate = getNextBillingDateKST();
        await this.userRepository.updateNextBillingDate(user.id, nextDate);

        successCount++;
      } catch (error) {
        // 결제 실패 시 다른 사용자 결제에 영향을 주지 않도록 로깅만 하고 계속 진행
        console.error(`User ${user.id} billing failed:`, error);
        
        // 플랜을 free로 강등하는 등의 추가 실패 처리 로직
        await this.userRepository.updateUserPlan(user.id, "free");
        
        failCount++;
      }
    }

    return {
      successCount,
      failCount,
      totalCount: users.length,
    };
  }
}
