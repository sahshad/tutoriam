import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";
import container from "../di/container";
import { IUserController } from "../core/interfaces/controller/IUserController";
import { TYPES } from "../di/types";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const userController = container.get<IUserController>(TYPES.UserController);
const instructorController = container.get<IInstructorController>(TYPES.InstructorController);

router.get("/",authMiddleware([UserRole.ADMIN]),userController.getAllUsers);
router.patch("/:userId/status",authMiddleware([UserRole.ADMIN]), userController.toggleUserStatus)
router.get("/dashboard", authMiddleware([UserRole.USER]), userController.getDashboardData )
router.get("/profile", authMiddleware([UserRole.USER]), userController.getUserProfile);
router.put("/profile", authMiddleware([UserRole.USER]), upload.single("profileImage"), userController.updateProfile);

router.patch("/change-password", authMiddleware([UserRole.USER]), userController.changePassword);
router.post(
  "/become-instructor",
  authMiddleware([UserRole.USER]),
  upload.single("idCardImage"),
  userController.becomeInstructor
);
router.get("/applications", authMiddleware([UserRole.USER]), instructorController.getUserApplications);

export default router;

