export type PaymentStatus = "PENDING" | "CANCELLED" | "FAILED" | "DONE";

export interface Order {
  id: string;
  userId: string;
  orderId: string;
  orderName: string;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}
