import { inject, injectable } from "inversify";
import { INotificationController } from "../core/interfaces/controller/INotificationController";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { INotificationService } from "../core/interfaces/service/INotificationService";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";

@injectable()
export class NotificationController implements INotificationController {
  constructor(@inject(TYPES.NotificationService) private notificationService: INotificationService) {}

//   createNotification = asyncHandler(async (req: Request, res: Response) => {
//     const data = req.body;
//     const notification = await this.notificationService.createNotification(data);
//     res.status(StatusCodes.CREATED).json(notification);
//   });

getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id as string
    const notifications = await this.notificationService.getUserNotifications(userId);
    res.status(StatusCodes.OK).json({message: "Notifications fetched successfully", notifications});
  });

  markNotificationAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { notificationId } = req.params;
    const updatedNotification = await this.notificationService.markNotificationAsRead(notificationId);
    res.status(StatusCodes.OK).json({ message: "Notification marked as read", notification:updatedNotification });
  });

  markAllNotificationsAsRead = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id as string
    await this.notificationService.markAllNotificationsAsRead(userId);
    res.status(StatusCodes.NO_CONTENT).send();
  });
}
