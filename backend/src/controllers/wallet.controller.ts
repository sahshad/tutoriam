import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { IWalletService } from "../core/interfaces/service/IWalletService";
import { TYPES } from "../di/types";
import { StatusCodes } from "http-status-codes";

@injectable()
export class WalletController {
  constructor(@inject(TYPES.WalletService) private walletService: IWalletService) {}

  getWallet = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const wallet = await this.walletService.getWallet(instructorId);
    res.status(StatusCodes.OK).json({ wallet });
  });

  creditWallet = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const { amount, method, referenceId } = req.body;
    const wallet = await this.walletService.creditWallet(instructorId, amount, method, referenceId);
    res.status(StatusCodes.OK).json({ message: "Credited successfully", wallet });
  });

  debitWallet = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const { amount, method, referenceId } = req.body;
    const wallet = await this.walletService.debitWallet(instructorId, amount, method, referenceId);
    res.status(StatusCodes.OK).json({ message: "Debit initiated", wallet });
  });
}
