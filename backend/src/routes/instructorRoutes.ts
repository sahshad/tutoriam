import express from "express";
import upload from "../middlewares/upload";
import container from "../di/container";
import { TYPES } from "../di/types";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { IModuleController } from "../core/interfaces/controller/IModuleController";
import { ILessonController } from "../core/interfaces/controller/ILessonController";
import { ICategoryController } from "../core/interfaces/controller/ICategoryController";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const courseController  = container.get<ICourseController>(TYPES.CourseController)
const moduleController = container.get<IModuleController>(TYPES.ModuleController)
const lessonController = container.get<ILessonController>(TYPES.LessonController)
const categoryController = container.get<ICategoryController>(TYPES.CategoryController)

// router.use(authMiddleware);
router.post(
  "/course",
  authMiddleware([UserRole.INSTRUCTOR])
  ,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }, 
    { name: 'trailer', maxCount: 1 },
  ]), courseController.createCourse
);
router.post("/module", authMiddleware([UserRole.INSTRUCTOR]), moduleController.createModule)
router.post("/lesson", authMiddleware([UserRole.INSTRUCTOR]), upload.single("content"),lessonController.createLesson )
router.get("/courses", authMiddleware([UserRole.INSTRUCTOR]), courseController.getMyCourses)
router.patch("/courses/:courseId", authMiddleware([UserRole.INSTRUCTOR]), courseController.updatePublishStatus)

router.put(
  "/courses/:courseId", authMiddleware([UserRole.INSTRUCTOR]),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'trailer', maxCount: 1 },
  ]),
  courseController.updateCourse
);
router.put("/modules/:moduleId", authMiddleware([UserRole.INSTRUCTOR]), moduleController.updateModule);
router.delete("/modules/:moduleId", authMiddleware([UserRole.INSTRUCTOR]), moduleController.deleteModule);
router.put("/lessons/:lessonId", authMiddleware([UserRole.INSTRUCTOR]), upload.single("content"), lessonController.updateLesson);
router.delete("/lessons/:lessonId", authMiddleware([UserRole.INSTRUCTOR]), lessonController.deleteLesson);

router.get("/categories", authMiddleware([UserRole.INSTRUCTOR, UserRole.USER]), categoryController.getListedCategories)

export default router;
