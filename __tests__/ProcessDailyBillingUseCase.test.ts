import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProcessDailyBillingUseCase } from '../src/application/use-cases/ProcessDailyBillingUseCase';
import { UserRepository } from '../src/domain/repositories/UserRepository';
import { PaymentGateway } from '../src/domain/repositories/PaymentGateway'; // 가상의 PG 인터페이스 또는 기존 TossPaymentsGateway 사용 가능

import { BillingGateway } from '../src/domain/repositories/BillingGateway';

// Mock Repository & Gateway
class MockUserRepository implements UserRepository {
  async updateUserPlan() {}
  async saveBillingKey() {}
  async getUser() { return null; }
  async getUsersToBillToday() { return []; }
  async updateNextBillingDate() {}
}

class MockBillingGateway implements BillingGateway {
  async executeBilling() { return true; }
}

describe('ProcessDailyBillingUseCase', () => {
  let useCase: ProcessDailyBillingUseCase;
  let userRepository: MockUserRepository;
  let billingGateway: MockBillingGateway;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    billingGateway = new MockBillingGateway();
    useCase = new ProcessDailyBillingUseCase(userRepository, billingGateway);
  });

  it('결제할 유저가 없는 경우 0 성공, 0 실패를 반환한다.', async () => {
    vi.spyOn(userRepository, 'getUsersToBillToday').mockResolvedValue([]);
    
    const result = await useCase.execute();
    
    expect(result.successCount).toBe(0);
    expect(result.failCount).toBe(0);
  });

  it('결제할 유저가 2명이고 모두 성공하는 경우, 2 성공을 반환하고 next_billing_date가 업데이트된다.', async () => {
    vi.spyOn(userRepository, 'getUsersToBillToday').mockResolvedValue([
      { id: '1', email: 'test1@test.com', customerKey: 'c1', billingKey: 'b1' },
      { id: '2', email: 'test2@test.com', customerKey: 'c2', billingKey: 'b2' }
    ]);
    const executeBillingSpy = vi.spyOn(billingGateway, 'executeBilling').mockResolvedValue(true);
    const updateDateSpy = vi.spyOn(userRepository, 'updateNextBillingDate').mockResolvedValue();

    const result = await useCase.execute();

    expect(result.successCount).toBe(2);
    expect(executeBillingSpy).toHaveBeenCalledTimes(2);
    expect(updateDateSpy).toHaveBeenCalledTimes(2);
  });

  it('결제 도중 한 명의 결제가 실패하더라도 에러가 멈추지 않고 나머지 유저는 진행되어야 한다.', async () => {
    vi.spyOn(userRepository, 'getUsersToBillToday').mockResolvedValue([
      { id: '1', email: 'test1@test.com', customerKey: 'c1', billingKey: 'b1' },
      { id: '2', email: 'test2@test.com', customerKey: 'c2', billingKey: 'b2' }
    ]);

    // 첫 번째 유저는 실패, 두 번째 유저는 성공
    vi.spyOn(billingGateway, 'executeBilling')
      .mockRejectedValueOnce(new Error('결제 실패'))
      .mockResolvedValueOnce(true);

    const result = await useCase.execute();

    expect(result.successCount).toBe(1);
    expect(result.failCount).toBe(1);
  });

  it('구독을 취소한 유저(빌링키 없음)가 포함된 경우 결제를 시도하지 않고 플랜을 free로 강등시킨다.', async () => {
    vi.spyOn(userRepository, 'getUsersToBillToday').mockResolvedValue([
      { id: '1', email: 'test1@test.com', customerKey: 'c1', billingKey: 'b1' }, // 정상 결제 대상
      { id: '2', email: 'cancel@test.com', customerKey: 'c2', billingKey: undefined as any } // 취소자 (만료일 도래)
    ]);

    const executeBillingSpy = vi.spyOn(billingGateway, 'executeBilling').mockResolvedValue(true);
    const updatePlanSpy = vi.spyOn(userRepository, 'updateUserPlan').mockResolvedValue();

    const result = await useCase.execute();

    // 취소자의 강등 처리도 '성공' 카운트로 포함하도록 변경되었음
    expect(result.successCount).toBe(2); 
    
    // 결제 시도는 1번(정상 유저)만 이루어져야 함
    expect(executeBillingSpy).toHaveBeenCalledTimes(1);
    
    // 취소자는 free 플랜으로 강등되어야 함
    expect(updatePlanSpy).toHaveBeenCalledWith('2', 'free');
  });
});

