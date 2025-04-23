import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../core/constants/user.enum";
import container from "../di/container";
import { IWishlistController } from "../core/interfaces/controller/IWishlistController";
import { TYPES } from "../di/types";

const router = express.Router();

const wishlistController = container.get<IWishlistController>(TYPES.WishlistController);

router.get("/", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), wishlistController.getWishlistItems);
router.post("/add", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), wishlistController.addItemToWishlist);
router.post("/remove", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), wishlistController.removeItemFromWishlist);

export default router;
