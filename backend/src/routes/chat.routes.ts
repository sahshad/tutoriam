import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/container";
import { TYPES } from "../di/types";
import { IChatController } from "../core/interfaces/controller/IChatController";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();
const chatController = container.get<IChatController>(TYPES.ChatController);

router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), chatController.getChats);
router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), chatController.createChat);

export default router;
