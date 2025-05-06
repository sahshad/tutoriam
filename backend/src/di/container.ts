import { Container } from "inversify";
import { TYPES } from "./types";

// ADMIN
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { IAdminService } from "../core/interfaces/service/IAdminService";
import { IAdminRepository } from "../core/interfaces/repository/IAdminRepository";
import { AdminController } from "../controllers/admin.controller";
import { AdminService } from "../services/admin.service";
import { AdminRepository } from "../repositories/admin.repository";

// USER
import { IUserController } from "../core/interfaces/controller/IUserController";
import { IUserService } from "../core/interfaces/service/IUserService";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";

// AUTHENTICATION
import { IAuthController } from "../core/interfaces/controller/IAuthController";
import { IAuthService } from "../core/interfaces/service/IAuthService";
import { IAuthRepository } from "../core/interfaces/repository/IAuthRepository";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { AuthRepository } from "../repositories/auth.repository";

// INSTRUCTOR
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { InstructorController } from "../controllers/instructor.controller";
import { InstructorService } from "../services/instructor.service";
import { InstructorRepository } from "../repositories/instructor.repository";

// COURSE
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import { CourseController } from "../controllers/course.controller";
import { CourseService } from "../services/coruse.service";
import { CourseRepository } from "../repositories/course.repository";

// MODULE
import { IModuleController } from "../core/interfaces/controller/IModuleController";
import { IModuleService } from "../core/interfaces/service/IModuleService";
import { IModuleRepository } from "../core/interfaces/repository/IModuleRepository";
import { ModuleController } from "../controllers/module.controller";
import { ModuleService } from "../services/module.service";
import { ModuleRepository } from "../repositories/module.repository";

// LESSON
import { ILessonController } from "../core/interfaces/controller/ILessonController";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { ILessonRepository } from "../core/interfaces/repository/ILessonRepository ";
import { LessonController } from "../controllers/lesson.controller";
import { LessonService } from "../services/lesson.service";
import { LessonRepository } from "../repositories/lesson.repository";

// CART
import { ICartController } from "../core/interfaces/controller/ICartController";
import { ICartService } from "../core/interfaces/service/ICartService";
import { ICartRepository } from "../core/interfaces/repository/ICartRepository";
import { CartController } from "../controllers/cart.controller";
import { CartService } from "../services/cart.service";
import { CartRepository } from "../repositories/cart.repository";

// WISHLIST
import { IWishlistController } from "../core/interfaces/controller/IWishlistController";
import { IWishlistService } from "../core/interfaces/service/IWishlistService";
import { IWishlistRepository } from "../core/interfaces/repository/IWishlistRepository";
import { WishlistController } from "../controllers/wishlist.controller";
import { WishlistService } from "../services/wishlist.service";
import { WishlistRepository } from "../repositories/wishlist.repository";

// CATEGORY
import { ICategoryController } from "../core/interfaces/controller/ICategoryController";
import { ICategoryService } from "../core/interfaces/service/ICategoryService";
import { ICategoryRepository } from "../core/interfaces/repository/ICategoryRepository";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repositories/category.repository";

// ORDER
import { IOrderController } from "../core/interfaces/controller/IOrderController";
import { IOrderService } from "../core/interfaces/service/IOrderService";
import { IOrderRepository } from "../core/interfaces/repository/IOrderRespoitory";
import { OrderController } from "../controllers/order.controller";
import { OrderService } from "../services/order.service";
import { OrderRepository } from "../repositories/order.repository";

// ENROLLMENT
import { IEnrollmentController } from "../core/interfaces/controller/IEnrollmentController";
import { IEnrollmentService } from "../core/interfaces/service/IEnrollmentService";
import { IEnrollmentRepository } from "../core/interfaces/repository/IEnrollmentRepository";
import { EnrollmentController } from "../controllers/enrollment.controller";
import { EnrollmentService } from "../services/enrollment.service";
import { EnrollmentRepository } from "../repositories/enrollment.repository";

// REVIEW
import { IReviewController } from "../core/interfaces/controller/IReviewController";
import { IReviewService } from "../core/interfaces/service/IReviewService";
import { IReviewRepository } from "../core/interfaces/repository/IReviewRepository";
import { ReviewController } from "../controllers/review.controller";
import { ReviewService } from "../services/review.service";
import { ReviewRepository } from "../repositories/review.repository";

// CERTIFICATE
import { ICertificateController } from "../core/interfaces/controller/ICertificateController";
import { ICertificateService } from "../core/interfaces/service/ICertficateService";
import { ICertificateRepository } from "../core/interfaces/repository/ICertificateRespository";
import { CertificateController } from "../controllers/certificate.controller";
import { CertificateService } from "../services/certificate.service";
import { CertificateRepository } from "../repositories/certificate.repository";

// CHAT
import { IChatController } from "../core/interfaces/controller/IChatController";
import { IChatService } from "../core/interfaces/service/IChatService";
import { IChatRepository } from "../core/interfaces/repository/IChatRepository";
import { ChatController } from "../controllers/chat.controller";
import { ChatService } from "../services/chat.service";
import { ChatRepository } from "../repositories/chat.repository";

// MESSAGE
import { IMessageController } from "../core/interfaces/controller/IMessageController";
import { IMessageService } from "../core/interfaces/service/IMessageService";
import { IMessageRepository } from "../core/interfaces/repository/IMessageRepository";
import { MessageController } from "../controllers/message.controller";
import { MessageService } from "../services/message.service";
import { MessageRepository } from "../repositories/message.repository";

// PAYMENT
import { IPaymentController } from "../core/interfaces/controller/IPaymentController";
import { IPaymentService } from "../core/interfaces/service/IPaymentService";
import { PaymentController } from "../controllers/payment.controller";
import { PaymentService } from "../services/payment.service";

// WEBHOOK
import { IWebhookController } from "../core/interfaces/controller/IWebhookController";
import { IWebhookService } from "../core/interfaces/service/IWebhookService";
import { WebhookController } from "../controllers/webhook.controller";
import { WebhookService } from "../services/webhook.service";

// WALLET
import { IWalletController } from "../core/interfaces/controller/IWalletController";
import { WalletController } from "../controllers/wallet.controller";
import { IWalletService } from "../core/interfaces/service/IWalletService";
import { WalletService } from "../services/wallet.service";
import { IWalletRepository } from "../core/interfaces/repository/IWalletRepository";
import { WalletRepository } from "../repositories/wallet.repository";

// TRANSACTION
import { ITransactionController } from "../core/interfaces/controller/ITransactionConroller";
import { TransactionController } from "../controllers/transaction.controller";
import { ITransactionService } from "../core/interfaces/service/ITransactionService";
import { TransactionService } from "../services/transaction.service";
import { ITransactionRepository } from "../core/interfaces/repository/ITransactionRepository";
import { TransactionRepository } from "../repositories/transaction.repository";

// PAYOUT
import { IPayoutController } from "../core/interfaces/controller/IPayoutController";
import { PayoutController } from "../controllers/payout.controllet";
import { IPayoutService } from "../core/interfaces/service/IPayoutService";
import { PayoutService } from "../services/payout.service";
import { IPayoutRepository } from "../core/interfaces/repository/IPayoutRepository";
import { PayoutRepository } from "../repositories/payout.repository";

// NOTIFICATION
import { INotificationController } from "../core/interfaces/controller/INotificationController";
import { NotificationController } from "../controllers/notification.controller";
import { INotificationService } from "../core/interfaces/service/INotificationService";
import { NotificationService } from "../services/notification.service";
import { INotificationRepository } from "../core/interfaces/repository/INotificationRepository";
import { NotificationRepository } from "../repositories/notification.repository";

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

container.bind<ICertificateController>(TYPES.CertificateController).to(CertificateController)
container.bind<ICertificateService>(TYPES.CertificateService).to(CertificateService)
container.bind<ICertificateRepository>(TYPES.CertificateRepository).to(CertificateRepository)

container.bind<IChatController>(TYPES.ChatController).to(ChatController)
container.bind<IChatService>(TYPES.ChatService).to(ChatService)
container.bind<IChatRepository>(TYPES.ChatRepository).to(ChatRepository)

container.bind<IMessageController>(TYPES.MessageController).to(MessageController)
container.bind<IMessageService>(TYPES.MessageService).to(MessageService)
container.bind<IMessageRepository>(TYPES.MessageRepository).to(MessageRepository)

container.bind<IWalletController>(TYPES.WalletController).to(WalletController)
container.bind<IWalletService>(TYPES.WalletService).to(WalletService)
container.bind<IWalletRepository>(TYPES.WalletRepository).to(WalletRepository)

container.bind<ITransactionController>(TYPES.TransactionController).to(TransactionController)
container.bind<ITransactionService>(TYPES.TransactionService).to(TransactionService)
container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository)

container.bind<IPayoutController>(TYPES.PayoutController).to(PayoutController)
container.bind<IPayoutService>(TYPES.PayoutService).to(PayoutService)
container.bind<IPayoutRepository>(TYPES.PayoutRepository).to(PayoutRepository)

container.bind<INotificationController>(TYPES.NotificationController).to(NotificationController)
container.bind<INotificationService>(TYPES.NotificationService).to(NotificationService)
container.bind<INotificationRepository>(TYPES.NotificationRepository).to(NotificationRepository)

container.bind<IPaymentController>(TYPES.PaymentController).to(PaymentController)
container.bind<IPaymentService>(TYPES.PaymentService).to(PaymentService)

container.bind<IWebhookController>(TYPES.WebhookController).to(WebhookController)
container.bind<IWebhookService>(TYPES.WebhookService).to(WebhookService)

export default container