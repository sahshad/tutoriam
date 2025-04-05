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

// router.use(authMiddleware);
router.post(
  "/course",
  authMiddleware(["instructor"])
  ,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 }, 
    { name: 'trailer', maxCount: 1 },
  ]), courseController.createCourse
);
router.post("/module", authMiddleware(["instructor"]), moduleController.createModule)
router.post("/lesson", authMiddleware(["instructor"]), upload.single("content"),lessonController.createLesson )
router.get("/courses", authMiddleware(["instructor"]), courseController.getMyCourses)
router.patch("/courses/:courseId", authMiddleware(["instructor"]), courseController.updatePublishStatus)

router.put(
  "/courses/:courseId", authMiddleware(["instructor"]),
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'trailer', maxCount: 1 },
  ]),
  courseController.updateCourse
);
router.put("/modules/:moduleId", authMiddleware(["instructor"]), moduleController.updateModule);
router.delete("/modules/:moduleId", authMiddleware(["instructor"]), moduleController.deleteModule);
router.put("/lessons/:lessonId", authMiddleware(["instructor"]), upload.single("content"), lessonController.updateLesson);
router.delete("/lessons/:lessonId", authMiddleware(["instructor"]), lessonController.deleteLesson);


export default router;
