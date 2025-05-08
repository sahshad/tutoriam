import { Request, Response } from "express";
import { IOrderController } from "../core/interfaces/controller/IOrderController";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IOrderService } from "../core/interfaces/service/IOrderService";
import { StatusCodes } from "http-status-codes";

@injectable()
export class OrderController implements IOrderController{
    constructor(
        @inject(TYPES.OrderService) private orderService: IOrderService
    ){}    
    getUserOrders= asyncHandler(async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id;
        const orders = await this.orderService.getUserOrders(userId as string);
        res.status(StatusCodes.OK).json({message: "order fetched successfully", orders});
    })

    getAllOrders = asyncHandler(async(req: Request, res:Response) :Promise<void> => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const ordersWithPagination = await this.orderService.getAllOrder(page, limit)
        res.status(StatusCodes.OK).json({message: "order fetched successfully", ordersWithPagination })
    })
}