import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { injectable, inject } from "inversify";
import { IPayoutController } from "../core/interfaces/controller/IPayoutController";
import { IPayoutService } from "../core/interfaces/service/IPayoutService";
import { TYPES } from "../di/types";
import { StatusCodes } from "http-status-codes";

@injectable()
export class PayoutController implements IPayoutController {
  constructor(@inject(TYPES.PayoutService) private payoutService: IPayoutService) {}

  createRequest = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const payout = await this.payoutService.createRequest(instructorId, req.body);
    res.status(StatusCodes.CREATED).json({ message: "Payout request submitted", payout });
  });

  getMyPayoutRequests = asyncHandler(async (req: Request, res: Response) => {
    const instructorId = req.user?._id as string
    const payouts = await this.payoutService.getPayoutsByInstructor(instructorId);
    res.status(StatusCodes.OK).json(payouts);
  });

  getAllPending = asyncHandler(async (_req: Request, res: Response) => {
    const requests = await this.payoutService.getAllPending();
    res.status(StatusCodes.OK).json({ requests });
  });

  getAllPayoutRequests = asyncHandler(async (req: Request, res: Response) => {
    const payouts = await this.payoutService.getAllPayouts();
    res.status(StatusCodes.OK).json(payouts);
  });

  approveRequest = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { adminNote } = req.body;
    const payout = await this.payoutService.approveRequest(id, adminNote);
    res.status(StatusCodes.OK).json({ message: "Payout approved", payout });
  });

  rejectRequest = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { adminNote } = req.body;
    const payout = await this.payoutService.rejectRequest(id, adminNote);
    res.status(StatusCodes.OK).json({ message: "Payout rejected", payout });
  });
}
 