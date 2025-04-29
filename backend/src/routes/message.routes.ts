import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/container";
import { TYPES } from "../di/types";
import { IMessageController } from "../core/interfaces/controller/IMessageController";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();
const messageController = container.get<IMessageController>(TYPES.MessageController);

router.get("/:chatId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), messageController.getMessages);
router.post("/send", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), messageController.createMessage);
router.patch("/:messageId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), messageController.updateMessage)
router.delete("/:messageId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), messageController.deleteMessage)

export default router;
