import { Order, PaymentStatus } from "../entities/Order";

export interface OrderRepository {
  createOrder(userId: string, orderId: string, orderName: string, amount: number): Promise<Order>;
  updateOrderStatus(orderId: string, status: PaymentStatus): Promise<void>;
  getOrderByOrderId(orderId: string): Promise<Order | null>;
}
