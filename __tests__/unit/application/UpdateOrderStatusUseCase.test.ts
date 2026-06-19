import { describe, it, expect, vi } from "vitest";
import { UpdateOrderStatusUseCase } from "../../../src/application/use-cases/UpdateOrderStatusUseCase";
import { OrderRepository } from "../../../src/domain/repositories/OrderRepository";

describe("UpdateOrderStatusUseCase", () => {
  it("should update the order status successfully", async () => {
    // Arrange
    const mockOrderRepository: OrderRepository = {
      createOrder: vi.fn(),
      updateOrderStatus: vi.fn().mockResolvedValue(undefined),
      getOrderByOrderId: vi.fn(),
    };

    const useCase = new UpdateOrderStatusUseCase(mockOrderRepository);

    // Act
    await useCase.execute("ORDER_123", "CANCELLED");

    // Assert
    expect(mockOrderRepository.updateOrderStatus).toHaveBeenCalledWith("ORDER_123", "CANCELLED");
  });

  it("should throw an error if parameters are missing", async () => {
    const mockOrderRepository: OrderRepository = {
      createOrder: vi.fn(),
      updateOrderStatus: vi.fn(),
      getOrderByOrderId: vi.fn(),
    };
    const useCase = new UpdateOrderStatusUseCase(mockOrderRepository);

    // @ts-ignore
    await expect(useCase.execute("", "CANCELLED")).rejects.toThrow("Missing parameters for updating order status.");
    // @ts-ignore
    await expect(useCase.execute("ORDER_123", "")).rejects.toThrow("Missing parameters for updating order status.");
  });
});
