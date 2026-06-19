import { Payment, PaymentRequest } from "../entities/Payment";

export interface PaymentGatewayRepository {
  /**
   * 결제 요청을 승인합니다.
   * @param request 결제 승인에 필요한 파라미터 (paymentKey, orderId, amount)
   * @returns 승인된 결제 객체 (Payment)
   * @throws 오류가 발생할 경우 Error 객체 반환
   */
  approvePayment(request: PaymentRequest): Promise<Payment>;
}
