import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { PaymentStatus } from "../../domain/entities/Order";

export class UpdateOrderStatusUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(orderId: string, status: PaymentStatus): Promise<void> {
    if (!orderId || !status) {
      throw new Error("Missing parameters for updating order status.");
    }

    await this.orderRepository.updateOrderStatus(orderId, status);
  }
}
