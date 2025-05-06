import express from 'express'
import container from '../di/container';
import { INotificationController } from '../core/interfaces/controller/INotificationController';
import { TYPES } from '../di/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserRole } from '../core/constants/user.enum';

const router = express.Router()

const notificationController = container.get<INotificationController>(TYPES.NotificationController)

// router.post("/", notificationController.createNotification);
router.get("/", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), notificationController.getNotifications);
router.patch("/:notificationId/read", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), notificationController.markNotificationAsRead);
router.patch("/read", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), notificationController.markAllNotificationsAsRead);

export default router