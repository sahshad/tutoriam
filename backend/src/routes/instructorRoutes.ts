import express from "express";
import upload from "../middlewares/upload";
import container from "../di/container";
import { TYPES } from "../di/types";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { IModuleController } from "../core/interfaces/controller/IModuleController";
import { ILessonController } from "../core/interfaces/controller/ILessonController";

const router = express.Router();

const courseController  = container.get<ICourseController>(TYPES.CourseController)
const moduleController = container.get<IModuleController>(TYPES.ModuleController)
const lessonController = container.get<ILessonController>(TYPES.LessonController)

router.use(authMiddleware);
router.post(
  "/course",
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }, 
    { name: 'trailer', maxCount: 1 },
  ]), courseController.createCourse
);
router.post("/module", moduleController.createModule)
router.post("/lesson", upload.single("content"),lessonController.createLesson )

export default router;
