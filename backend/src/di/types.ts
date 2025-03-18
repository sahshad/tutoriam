export const TYPES = {
  // controllers
  AdminController: Symbol.for("AdminController"),
  UserController: Symbol.for("UserController"),
  AuthController: Symbol.for("AuthController"),

  // Services
  AdminService: Symbol.for("AdminService"),
  UserService: Symbol.for("UserService"),
  AuthService: Symbol.for("AuthService"),

  // Repositories
  AdminRepository: Symbol.for("AdminRepository"),
  UserRepository: Symbol.for("UserRepository"),
  AuthRepository: Symbol.for("AuthRepository"),
};
