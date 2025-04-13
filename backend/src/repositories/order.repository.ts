import { injectable } from "inversify";
import { IOrderRepository } from "../core/interfaces/repository/IOrderRespoitory";
import Order from "../models/Order";

@injectable()
export class OrderRepository implements IOrderRepository {
    async createOrder(userId:string, courseIds:string[], amount:number, paymentIntentId:string) {
        return Order.create({
          userId,
          courseIds,
          totalAmount: amount,
          paymentIntentId,
          status: "Paid"
        });
      }
      async getOrdersByUser(userId:string) {
        return Order.find({ userId }).sort({ createdAt: -1 }).populate("courseIds");
      }
}