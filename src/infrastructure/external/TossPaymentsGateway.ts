import { PaymentGatewayRepository } from "../../domain/repositories/PaymentGatewayRepository";
import { Payment, PaymentRequest } from "../../domain/entities/Payment";

export class TossPaymentsGateway implements PaymentGatewayRepository {
  private readonly baseUrl = "https://api.tosspayments.com/v1/payments";

  constructor(private readonly secretKey: string) {
    if (!secretKey) {
      throw new Error("Toss Payments secret key is not configured.");
    }
  }

  async approvePayment(request: PaymentRequest): Promise<Payment> {
    const url = `${this.baseUrl}/confirm`;
    const encryptedSecretKey = Buffer.from(`${this.secretKey}:`).toString("base64");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encryptedSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey: request.paymentKey,
        orderId: request.orderId,
        amount: request.amount,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Payment approval failed: ${data.code} - ${data.message}`);
    }

    return {
      paymentKey: data.paymentKey,
      orderId: data.orderId,
      amount: data.totalAmount, // Toss responds with totalAmount
      status: data.status,
      orderName: data.orderName,
      requestedAt: data.requestedAt,
      approvedAt: data.approvedAt,
      method: data.method,
    };
  }
}
