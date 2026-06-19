export interface BillingGateway {
  /**
   * 빌링키를 사용하여 실제 결제(승인)를 요청합니다.
   */
  executeBilling(customerKey: string, billingKey: string, amount: number, orderId: string, orderName: string): Promise<boolean>;
}
