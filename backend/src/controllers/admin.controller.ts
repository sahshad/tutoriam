import { Request, Response } from "express";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { inject, injectable } from "inversify";
import { IAdminService } from "../core/interfaces/service/IAdminService";
import { TYPES } from "../di/types";
import asyncHandler from "express-async-handler";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import { StatusCodes } from "http-status-codes";

@injectable()
export class AdminController implements IAdminController {
  constructor(
    @inject(TYPES.AdminService) private adminService: IAdminService,
    @inject(TYPES.InstructorService)
    private instructorService: IInstructorService
  ) {}

  getUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const users = await this.adminService.getUsers();
    if (!users) {
      res.status(404).json({ message: "users not found" });
      return;
    }
    res.status(200).json({ users });
  });

  toggleUserStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const user = await this.adminService.toggleUserStatus(userId);
    res.status(200).json({ message: "user status changed successfully" });
  });

  reviewInstructor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { instructorId } = req.params;
    const { status, reason } = req.body;
    await this.adminService.reviewTutorApplication(instructorId, status, reason);
    res.status(200).json({ message: `instructor ${status} successfully` });
  });

  getInstructors = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const instructors = await this.instructorService.getInstructors();
    res.status(StatusCodes.OK).json({ message: "Instructors retrieved successfully.", instructors });
  });
}
