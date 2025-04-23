import express from "express";
import container from "../di/container";
import { TYPES } from "../di/types";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../core/constants/user.enum";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";

const router = express.Router();

const instructorController = container.get<IInstructorController>(TYPES.InstructorController)

router.get("/:userId/dashboard", authMiddleware([UserRole.INSTRUCTOR]));
router.get("/:userId/profile", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), instructorController.getInstructorProfile);
router.get("/applications",authMiddleware([UserRole.ADMIN]),instructorController.getInstructorApplications)
router.patch("/applications/:instructorId/status",authMiddleware([UserRole.ADMIN]),instructorController.reviewInstructor)

export default router;
