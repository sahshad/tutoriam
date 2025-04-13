import { inject, injectable } from "inversify";
import { IOrderService } from "../core/interfaces/service/IOrderService";
import { TYPES } from "../di/types";
import { IOrderRepository } from "../core/interfaces/repository/IOrderRespoitory";

@injectable()
export class OrderService implements IOrderService {
  constructor(@inject(TYPES.OrderRepository) private orderRepository: IOrderRepository) {}

  createOrder(userId: string, courseIds: string[], amount: number, paymentIntentId: string) {
    return this.orderRepository.createOrder(userId, courseIds, amount, paymentIntentId);
  }

  getUserOrders(userId: string) {
    return this.orderRepository.getOrdersByUser(userId);
  }
}
