import { describe, it, expect, vi } from "vitest";
import { ApprovePaymentUseCase } from "../../../src/application/use-cases/ApprovePaymentUseCase";
import { PaymentGatewayRepository } from "../../../src/domain/repositories/PaymentGatewayRepository";
import { UserRepository } from "../../../src/domain/repositories/UserRepository";
import { OrderRepository } from "../../../src/domain/repositories/OrderRepository";
import { Payment, PaymentRequest } from "../../../src/domain/entities/Payment";

describe("ApprovePaymentUseCase", () => {
  it("should approve payment successfully and upgrade user plan to pro and mark order DONE", async () => {
    // Arrange
    const mockPayment: Payment = {
      paymentKey: "test_payment_key",
      orderId: "test_order_id",
      amount: 1000,
      status: "DONE",
      orderName: "테스트 상품",
    };

    const mockPaymentGatewayRepository: PaymentGatewayRepository = {
      approvePayment: vi.fn().mockResolvedValue(mockPayment),
    };

    const mockUserRepository: UserRepository = {
      updateUserPlan: vi.fn().mockResolvedValue(undefined),
    };

    const mockOrderRepository: OrderRepository = {
      createOrder: vi.fn(),
      updateOrderStatus: vi.fn().mockResolvedValue(undefined),
      getOrderByOrderId: vi.fn(),
    };

    const useCase = new ApprovePaymentUseCase(mockPaymentGatewayRepository, mockUserRepository, mockOrderRepository);

    const request: PaymentRequest & { userId: string } = {
      paymentKey: "test_payment_key",
      orderId: "test_order_id",
      amount: 1000,
      userId: "user_123",
    };

    // Act
    const result = await useCase.execute(request);

    // Assert
    expect(mockPaymentGatewayRepository.approvePayment).toHaveBeenCalledWith({
      paymentKey: request.paymentKey,
      orderId: request.orderId,
      amount: request.amount,
    });
    expect(mockOrderRepository.updateOrderStatus).toHaveBeenCalledWith("test_order_id", "DONE");
    expect(mockUserRepository.updateUserPlan).toHaveBeenCalledWith("user_123", "pro");
    expect(result).toEqual(mockPayment);
  });

  it("should throw an error if payment approval fails and not update user plan", async () => {
    // Arrange
    const error = new Error("Payment approval failed");
    const mockPaymentGatewayRepository: PaymentGatewayRepository = {
      approvePayment: vi.fn().mockRejectedValue(error),
    };

    const mockUserRepository: UserRepository = {
      updateUserPlan: vi.fn().mockResolvedValue(undefined),
    };

    const mockOrderRepository: OrderRepository = {
      createOrder: vi.fn(),
      updateOrderStatus: vi.fn().mockResolvedValue(undefined),
      getOrderByOrderId: vi.fn(),
    };

    const useCase = new ApprovePaymentUseCase(mockPaymentGatewayRepository, mockUserRepository, mockOrderRepository);

    const request: PaymentRequest & { userId: string } = {
      paymentKey: "invalid_key",
      orderId: "invalid_order",
      amount: 1000,
      userId: "user_123",
    };

    // Act & Assert
    await expect(useCase.execute(request)).rejects.toThrow("Payment approval failed");
    expect(mockUserRepository.updateUserPlan).not.toHaveBeenCalled();
    expect(mockOrderRepository.updateOrderStatus).not.toHaveBeenCalled();
  });
});

