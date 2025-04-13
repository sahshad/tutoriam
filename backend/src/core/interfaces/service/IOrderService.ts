import { IOrder } from "../../../models/Order";

export interface IOrderService {
    createOrder(userId: string, courseIds: string[], amount: number, paymentIntentId: string): Promise<IOrder>;
    getUserOrders(userId: string): Promise<IOrder[]>;
  }