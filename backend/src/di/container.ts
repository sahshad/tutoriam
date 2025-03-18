import { IAdminController } from "@/core/interfaces/controller/IAdminController";
import { Container } from "inversify";
import { TYPES } from "./types";
import { AdminController } from "@/controllers/AdminController";
import { AdminService } from "@/services/AdminService";
import { AdminRepository } from "@/repositories/AdminRepository";
import { UserController } from "@/controllers/UserController";
import { UserRepository } from "@/repositories/userRepository";
import { UserService } from "@/services/userService";
import { AuthController } from "@/controllers/AuthController";
import { AuthService } from "@/services/AuthService";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IAdminService } from "@/core/interfaces/service/IAdminService";
import { IAdminRepository } from "@/core/interfaces/repository/IAdminRepository";
import { IUserController } from "@/core/interfaces/controller/IUserController";
import { IUserService } from "@/core/interfaces/service/IUserService";
import { IUserRepository } from "@/core/interfaces/repository/IUserRepository";
import { IAuthController } from "@/core/interfaces/controller/IAuthController";
import { IAuthService } from "@/core/interfaces/service/IAuthService";
import { IAuthRepository } from "@/core/interfaces/repository/IAuthRepository";


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

export default container