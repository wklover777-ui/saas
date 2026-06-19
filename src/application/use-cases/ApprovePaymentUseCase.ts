import { PaymentGatewayRepository } from "../../domain/repositories/PaymentGatewayRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Payment, PaymentRequest } from "../../domain/entities/Payment";

export class ApprovePaymentUseCase {
  constructor(
    private readonly paymentGatewayRepository: PaymentGatewayRepository,
    private readonly userRepository: UserRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  /**
   * 결제 승인 유스케이스 실행 및 유저 플랜 승급
   * @param request 결제 승인 요청 파라미터 (userId 추가)
   * @returns 승인된 결제 객체
   */
  async execute(request: PaymentRequest & { userId: string }): Promise<Payment> {
    if (!request.paymentKey || !request.orderId || !request.amount || !request.userId) {
      throw new Error("Missing required payment approval parameters.");
    }

    // 1. 토스페이먼츠 결제 승인 요청
    const payment = await this.paymentGatewayRepository.approvePayment({
      paymentKey: request.paymentKey,
      orderId: request.orderId,
      amount: request.amount,
    });

    // 2. 승인 성공 시 해당 주문을 DONE 처리하고 유저 플랜을 업그레이드
    if (payment.status === "DONE") {
      await this.orderRepository.updateOrderStatus(request.orderId, "DONE");
      await this.userRepository.updateUserPlan(request.userId, "pro");
    }

    return payment;
  }
}
