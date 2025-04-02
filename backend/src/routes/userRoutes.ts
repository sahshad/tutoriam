import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/user.controller";
import upload from "../middlewares/upload";
import container from "../di/container";
import { IUserController } from "../core/interfaces/controller/IUserController";
import { TYPES } from "../di/types";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import { CartController } from "../controllers/cart.controller";
import { ICartController } from "../core/interfaces/controller/ICartController";
import { IWishlistController } from "../core/interfaces/controller/IWishlistController";


const router = express.Router();

const userController = container.get<IUserController>(TYPES.UserController)
const courseController = container.get<ICourseController>(TYPES.CourseController)
const cartController = container.get<ICartController>(TYPES.CartController)
const wishlistControllet = container.get<IWishlistController>(TYPES.WishlistController)

router.use(authMiddleware);
router.get("/profile", userController.getUserProfile)
router.put(
  "/profile",
  upload.single("profileImage"),
  userController.updateProfile
);
router.patch("/:userId/change-password", userController.changePassword)
router.post("/:userId/become-instructor",upload.single("idCardImage"), userController.becomeInstructor)
router.get("/courses", courseController.getAllCourses)
router.get("/cart", cartController.getCart)
router.post("/cart/add", cartController.addItemToCart)
router.post("/cart/remove", cartController.removeItemFromCart)
router.get("/wishlist", wishlistControllet.getWishlistItems)
router.post("/wishlist/add", wishlistControllet.addItemToWishlist)
router.post("/wishlist/remove", wishlistControllet.removeItemFromWishlist)


export default router;
