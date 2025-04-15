import express from 'express'
import container from '../di/container'
import { IReviewController } from '../core/interfaces/controller/IReviewController'
import { TYPES } from '../di/types'
import { authMiddleware } from '../middlewares/authMiddleware'
import { UserRole } from '../core/constants/user.enum'

const router = express.Router()

const reviewController = container.get<IReviewController>(TYPES.ReviewController)

router.post("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.addReview)
router.patch("/:reviewId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.updateReview)
router.get("/:courseId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.getCourseReviews)
router.delete("/:reviewId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), reviewController.deleteReview)

export default router