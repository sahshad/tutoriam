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

    getInstructorProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
      const {userId } = req.params
      const instructor = await this.instructorService.getInstructorProfile(userId as string)
      res.status(StatusCodes.OK).json({message: "instructor profile fetched successfully", instructor})
    })

    getUserApplications = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?._id
        const applications = await this.instructorService.getUserApplications(userId as string);
        res.status(StatusCodes.OK).json({ applications, message: "applications fetched successfully" });
      
    })

     reviewInstructor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        const { instructorId } = req.params;
        const { status, reason } = req.body;
        await this.instructorService.reviewTutorApplication(instructorId, status, reason);
        res.status(200).json({ message: `instructor ${status} successfully` });
      });

}