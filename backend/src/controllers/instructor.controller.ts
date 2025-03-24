import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

@injectable()
export class InstructorController implements IInstructorController {
 
    constructor(@inject(TYPES.InstructorService) private instructorService:IInstructorService){}

    getInstructorApplications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const instructorApplications = await this.instructorService.getInstructorApplications();
        res.status(StatusCodes.OK).json({ instructorApplications, message: "applications fetched successfully" });
      });

}