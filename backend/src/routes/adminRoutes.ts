import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import container from "../di/container";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { TYPES } from "../di/types";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";

const router = express.Router();

const adminController = container.get<IAdminController>(TYPES.AdminController)
const InstructorController = container.get<IInstructorController>(TYPES.InstructorController)

router.get("/dashboard", authMiddleware(["admin"]), adminController.getDashboard)
router.get("/users",authMiddleware(["admin"]),adminController.getUsers);
router.patch("/users/:userId/status",authMiddleware(["admin"]), adminController.toggleUserStatus)
router.get("/instructors/applications",authMiddleware(["admin"]),InstructorController.getInstructorApplications)
router.patch("/instructors/application/:instructorId/status",authMiddleware(["admin"]),adminController.reviewInstructor)

export default router;
