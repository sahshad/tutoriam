import { injectable } from "inversify";
import { IOrderRepository } from "../core/interfaces/repository/IOrderRespoitory";
import Order, { IOrder } from "../models/Order";
import { BaseRepository } from "../core/abstracts/base.repository";

@injectable()
export class OrderRepository extends BaseRepository<IOrder> implements IOrderRepository {
  constructor(){
    super(Order)
  }
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

     async findAllOrders(skip: number, limit: number): Promise<IOrder[] | null> {
       return await Order.find().skip(skip).limit(limit).populate({path: "userId", select: "name"})
     }
     
     async getRecentOrders(limit: number): Promise<IOrder[]> {
      return await Order.find().sort({ createdAt: -1 }).limit(limit).populate("userId")
    }
}