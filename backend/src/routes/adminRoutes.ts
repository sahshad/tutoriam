import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import container from "../di/container";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { TYPES } from "../di/types";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { ICategoryController } from "../core/interfaces/controller/ICategoryController";
import { CourseController } from "../controllers/course.controller";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const adminController = container.get<IAdminController>(TYPES.AdminController)
const instructorController = container.get<IInstructorController>(TYPES.InstructorController)
const categoryController = container.get<ICategoryController>(TYPES.CategoryController)

router.get("/dashboard", authMiddleware([UserRole.ADMIN]), adminController.getDashboard)

router.get("/users",authMiddleware([UserRole.ADMIN]),adminController.getUsers);
router.patch("/users/:userId/status",authMiddleware([UserRole.ADMIN]), adminController.toggleUserStatus)

router.get("/instructors/applications",authMiddleware([UserRole.ADMIN]),instructorController.getInstructorApplications)
router.patch("/instructors/application/:instructorId/status",authMiddleware([UserRole.ADMIN]),adminController.reviewInstructor)

router.get("/categories",authMiddleware([UserRole.ADMIN,UserRole.INSTRUCTOR]),categoryController.getAllCategories)
router.post("/categories",authMiddleware([UserRole.ADMIN]),categoryController.createCategory)
router.patch("/categories/:id",authMiddleware([UserRole.ADMIN]),categoryController.updateCategory)
router.patch("/categories/:id/status",authMiddleware([UserRole.ADMIN]),categoryController.toggleCategoryStatus)
export default router;
