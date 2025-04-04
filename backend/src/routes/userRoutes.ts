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
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";


const router = express.Router();

const userController = container.get<IUserController>(TYPES.UserController)
const courseController = container.get<ICourseController>(TYPES.CourseController)
const cartController = container.get<ICartController>(TYPES.CartController)
const wishlistControllet = container.get<IWishlistController>(TYPES.WishlistController)
const instructorController = container.get<IInstructorController>(TYPES.InstructorController) 

// router.use(authMiddleware);
router.get("/profile",authMiddleware(["user"]), userController.getUserProfile)
router.put(
  "/profile",authMiddleware(["user"]),
  upload.single("profileImage"),
  userController.updateProfile
);
router.patch("/:userId/change-password",authMiddleware(["user"]), userController.changePassword)
router.post("/:userId/become-instructor",authMiddleware(["user"]),upload.single("idCardImage"), userController.becomeInstructor)
router.get("/courses",authMiddleware(["user", "instructor"]), courseController.getAllCourses)
router.get("/courses/:courseId",authMiddleware(["user", "instructor"]), courseController.getCourseWithContent)
router.get("/instructor-profile",authMiddleware(["user"]), instructorController.getInstructorProfile)
router.get("/cart",authMiddleware(["user"]), cartController.getCart)
router.post("/cart/add",authMiddleware(["user"]), cartController.addItemToCart)
router.post("/cart/remove",authMiddleware(["user"]), cartController.removeItemFromCart)
router.get("/wishlist",authMiddleware(["user"]), wishlistControllet.getWishlistItems)
router.post("/wishlist/add",authMiddleware(["user"]), wishlistControllet.addItemToWishlist)
router.post("/wishlist/remove",authMiddleware(["user"]), wishlistControllet.removeItemFromWishlist)


export default router;
