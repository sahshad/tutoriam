import { IOrder } from "../../../models/Order";

export interface IOrderRepository {
    createOrder(userId: string, courseIds: string[], amount: number, paymentIntentId: string): Promise<IOrder>;
    getOrdersByUser(userId: string): Promise<IOrder[]>;
}