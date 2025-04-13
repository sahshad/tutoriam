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


const router = express.Router();

const userController = container.get<IUserController>(TYPES.UserController)
const courseController = container.get<ICourseController>(TYPES.CourseController)
const cartController = container.get<ICartController>(TYPES.CartController)
const wishlistControllet = container.get<IWishlistController>(TYPES.WishlistController)
const instructorController = container.get<IInstructorController>(TYPES.InstructorController) 
const enrollmentController = container.get<IEnrollmentController>(TYPES.EnrollmentController)

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
router.get("/cart",authMiddleware(["user","instructor"]), cartController.getCart)
router.post("/cart/add",authMiddleware(["user", "instructor"]), cartController.addItemToCart)
router.post("/cart/remove",authMiddleware(["user", "instructor"]), cartController.removeItemFromCart)
router.get("/wishlist",authMiddleware(["user", "instructor"]), wishlistControllet.getWishlistItems)
router.post("/wishlist/add",authMiddleware(["user", "instructor"]), wishlistControllet.addItemToWishlist)
router.post("/wishlist/remove",authMiddleware(["user", "instructor"]), wishlistControllet.removeItemFromWishlist)
router.get("/applications",authMiddleware(["user"]), instructorController.getUserApplications)
router.get("/enrolled/courses", authMiddleware(["user", "instructor"]), enrollmentController.getEnrolledCourses)
router.get("/courses/watch/:courseId", authMiddleware(["user", "instructor"]), enrollmentController.getOneEnrolledCourse)

router.patch("/courses/enrolled/update-lastvisit", authMiddleware(["user", "instructor"]), enrollmentController.updateLastVisitedLesson)
router.post("/courses/enrolled/complete-lesson", authMiddleware(["user", "instructor"]), enrollmentController.completeLesson)
export default router;
