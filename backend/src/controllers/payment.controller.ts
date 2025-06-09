import { inject, injectable } from "inversify";
import { IPaymentController } from "../core/interfaces/controller/IPaymentController";
import { TYPES } from "../di/types";
import { IPaymentService } from "../core/interfaces/service/IPaymentService";
import { Request, Response } from "express";

import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

@injectable()
export class PaymentController implements IPaymentController {
    constructor(@inject(TYPES.PaymentService) private paymentService:IPaymentService)
    {}

    createCheckoutSession = asyncHandler(async (req:Request, res:Response) => {
        const {courseIds} = req.body
        const userId = req.user?._id
        // console.log(req.body)

        const sessionUrl = await this.paymentService.createStripeSession(userId as string, courseIds)
        res.status(StatusCodes.OK).json({ url: sessionUrl });
    })

}