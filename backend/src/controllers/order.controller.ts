import { Request, Response } from "express";
import { IOrderController } from "../core/interfaces/controller/IOrderController";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IOrderService } from "../core/interfaces/service/IOrderService";

@injectable()
export class OrderController implements IOrderController{
    constructor(
        @inject(TYPES.OrderService) private orderService: IOrderService
    ){}    
    getUserOrders= asyncHandler(async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id;
        const orders = await this.orderService.getUserOrders(userId as string);
        res.status(200).json(orders);
    })
}