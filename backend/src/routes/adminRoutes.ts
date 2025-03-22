import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import container from "../di/container";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { TYPES } from "../di/types";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";

const router = express.Router();

const adminController = container.get<IAdminController>(TYPES.AdminController)
const InstructorController = container.get<IInstructorController>(TYPES.InstructorController)

router.use(authMiddleware);
router.get("/users",adminController.getUsers);
router.patch("/users/:userId/status", adminController.toggleUserStatus)
router.get("/instructors/applications",InstructorController.getInstructorApplications)
router.patch("/instructors/application/:instructorId/status",adminController.reviewInstructor)

export default router;
