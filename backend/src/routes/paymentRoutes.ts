import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import container from '../di/container'
import { TYPES } from '../di/types'
import { IPaymentController } from '../core/interfaces/controller/IPaymentController'
import { UserRole } from '../core/constants/user.enum'

const router = express.Router()

const paymentController = container.get<IPaymentController>(TYPES.PaymentController)

router.post("/create-checkout-session", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]),paymentController.createCheckoutSession )


export default router