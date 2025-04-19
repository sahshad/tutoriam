import express from 'express'
import container from '../di/container'
import { TYPES } from '../di/types'
import { authMiddleware } from '../middlewares/authMiddleware'
import { UserRole } from '../core/constants/user.enum'
import { IOrderController } from '../core/interfaces/controller/IOrderController'

const router = express.Router()

const orderController = container.get<IOrderController>(TYPES.OrderController)

router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), orderController.getUserOrders)

export default router