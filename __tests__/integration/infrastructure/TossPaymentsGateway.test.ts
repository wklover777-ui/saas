import { describe, it, expect, vi, beforeEach } from "vitest";
import { TossPaymentsGateway } from "../../../src/infrastructure/external/TossPaymentsGateway";
import { PaymentRequest } from "../../../src/domain/entities/Payment";

// fetch를 모킹합니다.
global.fetch = vi.fn();

describe("TossPaymentsGateway", () => {
  const secretKey = "test_sk_mock_secret_key";
  let gateway: TossPaymentsGateway;

  beforeEach(() => {
    vi.clearAllMocks();
    gateway = new TossPaymentsGateway(secretKey);
  });

  it("should successfully approve payment and return parsed payment object", async () => {
    // Arrange
    const request: PaymentRequest = {
      paymentKey: "mock_payment_key",
      orderId: "mock_order_id",
      amount: 1000,
    };

    const mockResponse = {
      paymentKey: request.paymentKey,
      orderId: request.orderId,
      totalAmount: request.amount,
      status: "DONE",
      orderName: "테스트 주문",
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    // Act
    const result = await gateway.approvePayment(request);

    // Assert
    const expectedAuthHeader = `Basic ${Buffer.from(secretKey + ":").toString("base64")}`;

    expect(global.fetch).toHaveBeenCalledWith("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: expectedAuthHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    expect(result).toEqual({
      paymentKey: "mock_payment_key",
      orderId: "mock_order_id",
      amount: 1000,
      status: "DONE",
      orderName: "테스트 주문",
    });
  });

  it("should throw an error if the toss API responds with an error", async () => {
    // Arrange
    const request: PaymentRequest = {
      paymentKey: "mock_payment_key",
      orderId: "mock_order_id",
      amount: 1000,
    };

    const mockErrorResponse = {
      code: "NOT_FOUND_PAYMENT_SESSION",
      message: "결제 시간이 만료되어 결제 진행 데이터가 존재하지 않습니다.",
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => mockErrorResponse,
    });

    // Act & Assert
    await expect(gateway.approvePayment(request)).rejects.toThrow(
      "Payment approval failed: NOT_FOUND_PAYMENT_SESSION - 결제 시간이 만료되어 결제 진행 데이터가 존재하지 않습니다."
    );
  });
});
