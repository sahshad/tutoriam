import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/container";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { TYPES } from "../di/types";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const adminController = container.get<IAdminController>(TYPES.AdminController)

router.get("/dashboard", authMiddleware([UserRole.ADMIN]), adminController.getDashboard)

export default router;
