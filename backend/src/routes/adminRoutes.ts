import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import container from "../di/container";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { TYPES } from "../di/types";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { ICategoryController } from "../core/interfaces/controller/ICategoryController";
import { CourseController } from "../controllers/course.controller";

const router = express.Router();

const adminController = container.get<IAdminController>(TYPES.AdminController)
const instructorController = container.get<IInstructorController>(TYPES.InstructorController)
const categoryController = container.get<ICategoryController>(TYPES.CategoryController)

router.get("/dashboard", authMiddleware(["admin"]), adminController.getDashboard)
router.get("/users",authMiddleware(["admin"]),adminController.getUsers);
router.patch("/users/:userId/status",authMiddleware(["admin"]), adminController.toggleUserStatus)
router.get("/instructors/applications",authMiddleware(["admin"]),instructorController.getInstructorApplications)
router.patch("/instructors/application/:instructorId/status",authMiddleware(["admin"]),adminController.reviewInstructor)
router.get("/categories",authMiddleware(["admin","instructor"]),categoryController.getAllCategories)
router.post("/categories",authMiddleware(["admin"]),categoryController.createCategory)
router.patch("/categories/:id",authMiddleware(["admin"]),categoryController.updateCategory)
router.patch("/categories/:id/status",authMiddleware(["admin"]),categoryController.toggleCategoryStatus)
export default router;
