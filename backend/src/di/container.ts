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

export default container