import { SupabaseClient } from "@supabase/supabase-js";
import { Order, PaymentStatus } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";

export class SupabaseOrderRepository implements OrderRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  private mapToOrder(data: any): Order {
    return {
      id: data.id,
      userId: data.user_id,
      orderId: data.order_id,
      orderName: data.order_name,
      amount: data.amount,
      status: data.status,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }

  async createOrder(userId: string, orderId: string, orderName: string, amount: number): Promise<Order> {
    const { data, error } = await this.supabase
      .from("orders")
      .insert({
        user_id: userId,
        order_id: orderId,
        order_name: orderName,
        amount,
        status: "PENDING",
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }

    return this.mapToOrder(data);
  }

  async updateOrderStatus(orderId: string, status: PaymentStatus): Promise<void> {
    const { error } = await this.supabase
      .from("orders")
      .update({ status })
      .eq("order_id", orderId);

    if (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }

  async getOrderByOrderId(orderId: string): Promise<Order | null> {
    const { data, error } = await this.supabase
      .from("orders")
      .select()
      .eq("order_id", orderId)
      .maybeSingle();

    if (error) {
      throw new Error(`Failed to get order: ${error.message}`);
    }

    if (!data) return null;

    return this.mapToOrder(data);
  }
}
