export interface Payment {
  paymentKey: string;
  orderId: string;
  amount: number;
  status: "READY" | "IN_PROGRESS" | "WAITING_FOR_DEPOSIT" | "DONE" | "CANCELED" | "PARTIAL_CANCELED" | "ABORTED" | "EXPIRED";
  orderName: string;
  requestedAt?: string;
  approvedAt?: string;
  method?: string;
}

export interface PaymentRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}
