import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { ITransactionService } from "../core/interfaces/service/ITransactionService";
import { TYPES } from "../di/types";
import { StatusCodes } from "http-status-codes";
import { ITransactionController } from "../core/interfaces/controller/ITransactionConroller";

@injectable()
export class TransactionController implements ITransactionController {
  constructor(@inject(TYPES.TransactionService) private transactionService: ITransactionService) {}

  getAllTransactions = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string 
    const transactions = await this.transactionService.getInstructorTransactions(instructorId);
    res.status(StatusCodes.OK).json({ transactions });
  });

  getRevenueStats = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const type = req.query.type as string
    const data = await this.transactionService.getRevenueStats(instructorId, type);
    res.status(StatusCodes.OK).json({data});
  })
}
