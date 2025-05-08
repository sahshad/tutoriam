import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../core/constants/user.enum";
import container from "../di/container";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import { TYPES } from "../di/types";
import upload from "../middlewares/upload.middleware";

const router = express.Router();

const courseController = container.get<ICourseController>(TYPES.CourseController);

router.get("/all", authMiddleware([UserRole.ADMIN]), courseController.getAllcoursesForAdmin)
router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), courseController.getAllCourses);
router.post(
  "/",
  authMiddleware([UserRole.INSTRUCTOR]),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
  ]),
  courseController.createCourse
);

router.put(
  "/:courseId",
  authMiddleware([UserRole.INSTRUCTOR]),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "trailer", maxCount: 1 },
  ]),
  courseController.updateCourse
);

router.get("/my-courses", authMiddleware([UserRole.INSTRUCTOR]), courseController.getMyCourses);
router.get("/:courseId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), courseController.getCourseWithContent);
router.patch("/publish/:courseId", authMiddleware([UserRole.INSTRUCTOR]), courseController.updatePublishStatus);

export default router;
