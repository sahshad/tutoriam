import express from "express";
import container from "../di/container";
import { TYPES } from "../di/types";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../core/constants/user.enum";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { ITransactionController } from "../core/interfaces/controller/ITransactionConroller";

const router = express.Router();

const instructorController = container.get<IInstructorController>(TYPES.InstructorController)
const transactionController = container.get<ITransactionController>(TYPES.TransactionController);

router.get("/", authMiddleware([UserRole.ADMIN]), instructorController.getAllInstructors)
router.get("/:userId/dashboard", authMiddleware([UserRole.INSTRUCTOR]));
router.get("/:userId/profile", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), instructorController.getInstructorProfile);
router.put("/:userId/profile", authMiddleware([UserRole.INSTRUCTOR]), instructorController.updateInstrucotrProfile)
router.get("/applications",authMiddleware([UserRole.ADMIN]),instructorController.getInstructorApplications)
router.get("/enrolled", authMiddleware([UserRole.USER]), instructorController.getEnrolledInstructorsForUser)
router.get("/revenue", authMiddleware([UserRole.INSTRUCTOR]), transactionController.getRevenueStats )
router.patch("/applications/:instructorId/status",authMiddleware([UserRole.ADMIN]),instructorController.reviewInstructor)

export default router;
