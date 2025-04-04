import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { IAuthController } from "../core/interfaces/controller/IAuthController";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IAuthService } from "../core/interfaces/service/IAuthService";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../core/interfaces/service/IUserService";
import { createRefreshToken } from "../utils/tokenServices";
import dotenv from "dotenv";
dotenv.config();

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.AuthService) private authService: IAuthService,
  @inject(TYPES.UserService) private userService: IUserService
) {}
  
  register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    await this.authService.register(name, email, password);
    res.status(StatusCodes.OK).json({ message: "otp send to your email" });
  });

  verifyOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    const response = await this.authService.verifyOtp(email, otp);
    const { refreshToken, ...newUser } = response;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json(newUser);
  });

  resendOtp = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    await this.authService.resendOtp(email);
    res.status(StatusCodes.OK).json({ message: "otp resend to your email" });
  });

  login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password, role } = req.body;
    console.log(req.body)
    const { refreshToken, ...user } = await this.authService.login(
      email,
      password,
      role
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json(user);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(403).json({ error: "Refresh token required" });
      return;
    }
    
    const { role } = req.body;
    const { accessToken, user } = await this.authService.refreshAccessToken(refreshToken, role);
    res.status(StatusCodes.OK).json({ accessToken, user });
  });

  logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(StatusCodes.OK).json({ message: "Logged out successfully" });
  });

  forgotPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    await this.authService.sendMagicLink(email);
    res.status(StatusCodes.OK).json({ message: "A reset link has been sent to your email" });
  });

  resetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, newPassword } = req.body;
    await this.authService.resetPassword(token, newPassword);
    res.status(StatusCodes.OK).json({ message: "password reseted successfully" });
  });

  googleAuth = asyncHandler(async (req:Request, res:Response): Promise<void> => {

    const { id, displayName, emails, photos } = req.user as any

    if (!emails || emails.length === 0) {
       res.status(400).json({ message: "Email is required" });
       return
    }

    const email = emails[0].value;
    const profileImageUrl = photos ? photos[0].value : null;


    let user = await this.userService.findUserByGoogleId(id)
    if (!user) {
      user = await this.userService.createGoogleUser( displayName, email,profileImageUrl, id )
    }

    const refreshToken = createRefreshToken(user?.id, 'user')

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.redirect(process.env.CLIENT_URL!)
  })
}


