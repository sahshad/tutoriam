import express from 'express'
import container from '../di/container'
import { TYPES } from '../di/types'
import { authMiddleware } from '../middlewares/authMiddleware'
import { UserRole } from '../core/constants/user.enum'
import { IEnrollmentController } from '../core/interfaces/controller/IEnrollmentController'

const router = express.Router()

const enrollmentController = container.get<IEnrollmentController>(TYPES.EnrollmentController)

router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.enroll)
router.get("/status", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.isUserEnrolled)

export default router