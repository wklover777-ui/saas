import { describe, it, expect, vi } from "vitest";
import { InitiatePaymentUseCase } from "../../../src/application/use-cases/InitiatePaymentUseCase";
import { OrderRepository } from "../../../src/domain/repositories/OrderRepository";
import { Order } from "../../../src/domain/entities/Order";

describe("InitiatePaymentUseCase", () => {
  it("should create an order with PENDING status and return it", async () => {
    // Arrange
    const mockOrder: Order = {
      id: "uuid-1",
      userId: "user-123",
      orderId: "ORDER_123456",
      orderName: "테스트 상품",
      amount: 1000,
      status: "PENDING",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockOrderRepository: OrderRepository = {
      createOrder: vi.fn().mockResolvedValue(mockOrder),
      updateOrderStatus: vi.fn(),
      getOrderByOrderId: vi.fn(),
    };

    const useCase = new InitiatePaymentUseCase(mockOrderRepository);

    // Act
    const result = await useCase.execute("user-123", "테스트 상품", 1000);

    // Assert
    expect(mockOrderRepository.createOrder).toHaveBeenCalledWith(
      "user-123",
      expect.stringMatching(/^ORDER_\d+_\d+$/),
      "테스트 상품",
      1000
    );
    expect(result).toEqual(mockOrder);
  });

  it("should throw an error if parameters are invalid", async () => {
    const mockOrderRepository: OrderRepository = {
      createOrder: vi.fn(),
      updateOrderStatus: vi.fn(),
      getOrderByOrderId: vi.fn(),
    };
    const useCase = new InitiatePaymentUseCase(mockOrderRepository);

    await expect(useCase.execute("", "테스트 상품", 1000)).rejects.toThrow("Invalid payment initiation parameters.");
    await expect(useCase.execute("user-123", "", 1000)).rejects.toThrow("Invalid payment initiation parameters.");
    await expect(useCase.execute("user-123", "테스트 상품", -100)).rejects.toThrow("Invalid payment initiation parameters.");
  });
});
