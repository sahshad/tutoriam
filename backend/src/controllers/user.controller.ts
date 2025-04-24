import { Request, Response } from "express";
import { IUserController } from "../core/interfaces/controller/IUserController";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IUserService } from "../core/interfaces/service/IUserService";
import { uploadImageToCloudinary } from "../utils/clodinaryServices";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.UserService) private userService: IUserService) {}

  updateProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string;
    const { name, title } = req.body;

    const updateData: { name: any; title: any; profileImageUrl?: string } = {
      name,
      title,
    };

    if (req.file) {
      const url = await uploadImageToCloudinary(req.file.buffer, "users/profileImages");
      if (url) updateData.profileImageUrl = url;
    }

    const response = await this.userService.updateUser(userId, updateData);
    res.status(StatusCodes.OK).json({ message: "user updated successfully", user: response });
  });

  changePassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?._id as string;
    const updatedUser = await this.userService.changePassword(userId, currentPassword, newPassword);
    if (!updatedUser || updatedUser instanceof Error) {
      console.log(updatedUser);
      res.status(StatusCodes.BAD_REQUEST).json({ message: "please check the given passwords" });
      return;
    }

    res.status(StatusCodes.OK).json({ message: "password changed successfully" });
  });

  getUserProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string;

    const user = await this.userService.getUserProfile(userId);

    if (user.status === "blocked") {
      res.status(StatusCodes.FORBIDDEN).json({ message: "you have been blocked" });
      return;
    }

    res.status(StatusCodes.OK).json({ user });
  });

  becomeInstructor = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const instructorData = req.body;
    instructorData.userId = req.user?._id;

    if (!req.file) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "file not found" });
      return;
    }

    const url = await uploadImageToCloudinary(req.file.buffer, "instructors/idCards");
    instructorData.idCardImageUrl = url;

    const instructor = await this.userService.becomeInstructor(instructorData);

    res.status(StatusCodes.OK).json({ message: "application submitted successfully" });
  });

  getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const users = await this.userService.find({ role: "user" });
    if (!users) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "users not found" });
      return;
    }
    res.status(StatusCodes.OK).json({ users });
  });

  toggleUserStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const user = await this.userService.toggleStatus(userId);
    res.status(StatusCodes.OK).json({ message: "user status changed successfully" });
  });

  getDashboardData = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string;
    const dashboardData = await this.userService.getDashboardData(userId);
    res.status(StatusCodes.OK).json({ message: "user dashboard fetched successfully", dashboardData });
  });
}
