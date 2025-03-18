import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import container from "../di/container";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { TYPES } from "../di/types";

const router = express.Router();

const adminController = container.get<IAdminController>(TYPES.AdminController)

router.use(authMiddleware);
router.get("/users",adminController.getUsers);
router.patch("/users/:userId/toggle-status", adminController.toggleUserStatus)

export default router;
