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
import { IEnrollmentController } from "../core/interfaces/controller/IEnrollmentController";
import { IReviewController } from "../core/interfaces/controller/IReviewController";
import { UserRole } from "../core/constants/user.enum";


const router = express.Router();

const userController = container.get<IUserController>(TYPES.UserController)
const courseController = container.get<ICourseController>(TYPES.CourseController)
const cartController = container.get<ICartController>(TYPES.CartController)
const wishlistControllet = container.get<IWishlistController>(TYPES.WishlistController)
const instructorController = container.get<IInstructorController>(TYPES.InstructorController) 
const enrollmentController = container.get<IEnrollmentController>(TYPES.EnrollmentController)

// router.use(authMiddleware);
router.get("/profile",authMiddleware([UserRole.USER]), userController.getUserProfile)
router.put(
  "/profile",authMiddleware([UserRole.USER]),
  upload.single("profileImage"),
  userController.updateProfile
);

router.patch("/:userId/change-password",authMiddleware([UserRole.USER]), userController.changePassword)
router.post("/:userId/become-instructor",authMiddleware([UserRole.USER]),upload.single("idCardImage"), userController.becomeInstructor)
router.get("/courses",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), courseController.getAllCourses)
router.get("/courses/:courseId",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), courseController.getCourseWithContent)
router.get("/instructor-profile",authMiddleware([UserRole.USER]), instructorController.getInstructorProfile)
router.get("/cart",authMiddleware([UserRole.USER,UserRole.INSTRUCTOR]), cartController.getCart)
router.post("/cart/add",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.addItemToCart)
router.post("/cart/remove",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), cartController.removeItemFromCart)
router.get("/wishlist",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), wishlistControllet.getWishlistItems)
router.post("/wishlist/add",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), wishlistControllet.addItemToWishlist)
router.post("/wishlist/remove",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), wishlistControllet.removeItemFromWishlist)
router.get("/applications",authMiddleware([UserRole.USER]), instructorController.getUserApplications)
router.get("/enrolled/courses", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.getEnrolledCourses)
router.get("/courses/watch/:courseId", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.getOneEnrolledCourse)

router.patch("/courses/enrolled/update-lastvisit", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.updateLastVisitedLesson)
router.post("/courses/enrolled/complete-lesson", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]), enrollmentController.completeLesson)


export default router;
