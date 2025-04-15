import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { Container } from "inversify";
import { TYPES } from "./types";
import { AdminController } from "../controllers/admin.controller";
import { AdminService } from "../services/admin.service";
import { AdminRepository } from "../repositories/admin.repository";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { AuthRepository } from "../repositories/auth.repository";
import { IAdminService } from "../core/interfaces/service/IAdminService";
import { IAdminRepository } from "../core/interfaces/repository/IAdminRepository";
import { IUserController } from "../core/interfaces/controller/IUserController";
import { IUserService } from "../core/interfaces/service/IUserService";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { IAuthController } from "../core/interfaces/controller/IAuthController";
import { IAuthService } from "../core/interfaces/service/IAuthService";
import { IAuthRepository } from "../core/interfaces/repository/IAuthRepository";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { InstructorRepository } from "../repositories/instructor.repository";
import { InstructorController } from "../controllers/instructor.controller";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { InstructorService } from "../services/instructor.service";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import { CourseController } from "../controllers/course.controller";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import { CourseRepository } from "../repositories/course.repository";
import { ModuleController } from "../controllers/module.controller";
import { IModuleController } from "../core/interfaces/controller/IModuleController";
import { IModuleService } from "../core/interfaces/service/IModuleService";
import { ModuleService } from "../services/module.service";
import { IModuleRepository } from "../core/interfaces/repository/IModuleRepository";
import { ModuleRepository } from "../repositories/module.repository";
import { ILessonController } from "../core/interfaces/controller/ILessonController";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { LessonController } from "../controllers/lesson.controller";
import { LessonService } from "../services/lesson.service";
import { ILessonRepository } from "../core/interfaces/repository/ILessonRepository ";
import { LessonRepository } from "../repositories/lesson.repository";
import { CourseService } from "../services/coruse.service";
import { ICartController } from "../core/interfaces/controller/ICartController";
import { CartController } from "../controllers/cart.controller";
import { ICartService } from "../core/interfaces/service/ICartService";
import { CartService } from "../services/cart.service";
import { ICartRepository } from "../core/interfaces/repository/ICartRepository";
import { CartRepository } from "../repositories/cart.repository";
import { IWishlistController } from "../core/interfaces/controller/IWishlistController";
import { WishlistController } from "../controllers/wishlist.controller";
import { IWishlistService } from "../core/interfaces/service/IWishlistService";
import { WishlistService } from "../services/wishlist.service";
import { IWishlistRepository } from "../core/interfaces/repository/IWishlistRepository";
import { WishlistRepository } from "../repositories/wishlist.repository";
import { ICategoryController } from "../core/interfaces/controller/ICategoryController";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repositories/category.repository";
import { ICategoryRepository } from "../core/interfaces/repository/ICategoryRepository";
import { ICategoryService } from "../core/interfaces/service/ICategoryService";
import { CategoryController } from "../controllers/category.controller";
import { IPaymentController } from "../core/interfaces/controller/IPaymentController";
import { PaymentController } from "../controllers/payment.controller";
import { IPaymentService } from "../core/interfaces/service/IPaymentService";
import { PaymentService } from "../services/payment.service";
import { IWebhookController } from "../core/interfaces/controller/IWebhookController";
import { WebhookController } from "../controllers/webhook.controller";
import { IWebhookService } from "../core/interfaces/service/IWebhookService";
import { WebhookService } from "../services/webhook.service";
import { IOrderController } from "../core/interfaces/controller/IOrderController";
import { OrderController } from "../controllers/order.controller";
import { IOrderService } from "../core/interfaces/service/IOrderService";
import { OrderService } from "../services/order.service";
import { IOrderRepository } from "../core/interfaces/repository/IOrderRespoitory";
import { OrderRepository } from "../repositories/order.repository";
import { IEnrollmentController } from "../core/interfaces/controller/IEnrollmentController";
import { EnrollmentController } from "../controllers/enrollment.controller";
import { IEnrollmentService } from "../core/interfaces/service/IEnrollmentService";
import { EnrollmentService } from "../services/enrollment.service";
import { IEnrollmentRepository } from "../core/interfaces/repository/IEnrollmentRepository";
import { EnrollmentRepository } from "../repositories/enrollment.repository";
import { IReviewController } from "../core/interfaces/controller/IReviewController";
import { ReviewController } from "../controllers/review.controller";
import { IReviewService } from "../core/interfaces/service/IReviewService";
import { ReviewService } from "../services/review.service";
import { IReviewRepository } from "../core/interfaces/repository/IReviewRepository";
import { ReviewRepository } from "../repositories/review.repository";

const container = new Container()

container.bind<IAdminController>(TYPES.AdminController).to(AdminController)
container.bind<IAdminService>(TYPES.AdminService).to(AdminService)
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository)

container.bind<IUserController>(TYPES.UserController).to(UserController)
container.bind<IUserService>(TYPES.UserService).to(UserService)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

container.bind<IAuthController>(TYPES.AuthController).to(AuthController)
container.bind<IAuthService>(TYPES.AuthService).to(AuthService)
container.bind<IAuthRepository>(TYPES.AuthRepository).to(AuthRepository)

container.bind<IInstructorController>(TYPES.InstructorController).to(InstructorController)
container.bind<IInstructorService>(TYPES.InstructorService).to(InstructorService)
container.bind<IInstructorRepository>(TYPES.InstructorRepository).to(InstructorRepository)

container.bind<ICourseController>(TYPES.CourseController).to(CourseController)
container.bind<ICourseService>(TYPES.CourseService).to(CourseService)
container.bind<ICourseRepository>(TYPES.CourseRepository).to(CourseRepository)

container.bind<IModuleController>(TYPES.ModuleController).to(ModuleController)
container.bind<IModuleService>(TYPES.ModuleService).to(ModuleService)
container.bind<IModuleRepository>(TYPES.ModuleRepository).to(ModuleRepository)

container.bind<ILessonController>(TYPES.LessonController).to(LessonController)
container.bind<ILessonService>(TYPES.LessonService).to(LessonService)
container.bind<ILessonRepository>(TYPES.LessonRepository).to(LessonRepository)

container.bind<ICartController>(TYPES.CartController).to(CartController)
container.bind<ICartService>(TYPES.CartService).to(CartService)
container.bind<ICartRepository>(TYPES.CartRepository).to(CartRepository)

container.bind<IWishlistController>(TYPES.WishlistController).to(WishlistController)
container.bind<IWishlistService>(TYPES.WishlistService).to(WishlistService)
container.bind<IWishlistRepository>(TYPES.WishlistRepository).to(WishlistRepository)

container.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController)
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)

container.bind<IOrderController>(TYPES.OrderController).to(OrderController)
container.bind<IOrderService>(TYPES.OrderService).to(OrderService)
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository)

container.bind<IEnrollmentController>(TYPES.EnrollmentController).to(EnrollmentController)
container.bind<IEnrollmentService>(TYPES.EnrollmentService).to(EnrollmentService)
container.bind<IEnrollmentRepository>(TYPES.EnrollmentRepository).to(EnrollmentRepository)

container.bind<IReviewController>(TYPES.ReviewController).to(ReviewController)
container.bind<IReviewService>(TYPES.ReviewService).to(ReviewService)
container.bind<IReviewRepository>(TYPES.ReviewRepository).to(ReviewRepository)

container.bind<IPaymentController>(TYPES.PaymentController).to(PaymentController)
container.bind<IPaymentService>(TYPES.PaymentService).to(PaymentService)

container.bind<IWebhookController>(TYPES.WebhookController).to(WebhookController)
container.bind<IWebhookService>(TYPES.WebhookService).to(WebhookService)

export default container