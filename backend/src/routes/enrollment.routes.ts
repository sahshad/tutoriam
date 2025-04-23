import express from 'express'
import container from '../di/container'
import { TYPES } from '../di/types'
import { authMiddleware } from '../middlewares/auth.middleware'
import { UserRole } from '../core/constants/user.enum'
import { IEnrollmentController } from '../core/interfaces/controller/IEnrollmentController'

const router = express.Router()

const enrollmentController = container.get<IEnrollmentController>(TYPES.EnrollmentController)

router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.enroll)
router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.getEnrolledCourses)
router.get("/:courseId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.getOneEnrolledCourse)
router.get("/:courseId/status", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.isUserEnrolled)
router.patch("/:courseId/update-lastvisit", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.updateLastVisitedLesson)
router.post("/:courseId/complete-lesson", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.completeLesson)


export default router