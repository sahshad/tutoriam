import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../core/constants/user.enum";
import container from "../di/container";
import { ICartController } from "../core/interfaces/controller/ICartController";
import { TYPES } from "../di/types";

const router = express.Router();

const cartController = container.get<ICartController>(TYPES.CartController);

router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.getCart);
router.post("/add", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.addItemToCart);
router.post("/remove", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.removeItemFromCart);

export default router;
