import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Order } from "../../domain/entities/Order";

export class InitiatePaymentUseCase {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(userId: string, orderName: string, amount: number): Promise<Order> {
    if (!userId || !orderName || amount <= 0) {
      throw new Error("Invalid payment initiation parameters.");
    }

    const orderId = `ORDER_${new Date().getTime()}_${Math.floor(Math.random() * 1000)}`;
    return await this.orderRepository.createOrder(userId, orderId, orderName, amount);
  }
}
