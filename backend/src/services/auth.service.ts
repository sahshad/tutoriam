import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendForgotPasswordMail, sendOtpEmail } from "../utils/emailServices";
import { RedisClient } from "../config/redis";
import { createAccessToken, createRefreshToken, verifyResetToken } from "../utils/tokenServices";
import { refreshedUser, verifiedUer } from "../core/types/userTypes";
import { IAuthService } from "../core/interfaces/service/IAuthService";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IAuthRepository } from "../core/interfaces/repository/IAuthRepository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { HttpException } from "../core/exceptions/HttpException";

dotenv.config();

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.AuthRepository) private authRepository: IAuthRepository,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async register(name: string, email: string, password: string): Promise<void> {
    const existingUser = await this.authRepository.findUserByEmail(email);
    if (existingUser) throw new Error("Email is already taken");

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedPassword = await bcrypt.hash(password, 10);

    await sendOtpEmail(email, otp);

    await RedisClient.setex(`otp:${email}`, 150, JSON.stringify({ otp }));

    await RedisClient.setex(`user_session:${email}`, 600, JSON.stringify({ name, email, hashedPassword }));
  }

  async verifyOtp(email: string, otp: string): Promise<verifiedUer> {
    const data = await RedisClient.get(`otp:${email}`);
    if (!data) throw new Error("OTP expired or invalid");

    const { otp: storedOtp } = JSON.parse(data);
    if (otp !== storedOtp) throw new Error("Invalid OTP");

    const userData = await RedisClient.get(`user_session:${email}`);
    if (!userData) throw new Error("User data not found Please register again");

    const { name, hashedPassword } = JSON.parse(userData);

    const user = await this.authRepository.createUser(name, email, hashedPassword);
    if (!user) throw new Error("Cannot create user please register again");
    const userId = user._id;
    const accessToken = jwt.sign({ userId, role: "user" }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId, role: "user" }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    await RedisClient.del(`otp:${email}`);
    await RedisClient.del(`user_session:${email}`);

    return { accessToken, refreshToken, user };
  }

  async resendOtp(email: string): Promise<void> {
    try {
      const user = await RedisClient.get(`user_session:${email}`);
      if (!user) throw new Error("user session expired please register again");

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await sendOtpEmail(email, otp);

      await RedisClient.setex(`otp:${email}`, 120, JSON.stringify({ otp }));
    } catch (error: any) {
      console.error(error);
      throw new Error(`error while resending otp:${error}`);
    }
  }

  async adminLogin(email: string, password: string): Promise<verifiedUer> {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new HttpException("Invalid email address", 404);
    }

    if (user.role !== "admin") {
      throw new HttpException("Access denied: Not an admin", 403);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException("Incorrect password", 401);
    }

    const userId = user._id;
    const accessToken = createAccessToken(userId, user.role);
    const refreshToken = createRefreshToken(userId, user.role);

    return { accessToken, refreshToken, user };
  }

  async login(email: string, password: string): Promise<verifiedUer> {
    const user = await this.userRepository.findOne({ email });

    if (!user) throw new Error("Invalid email address");

    if (user.role === "admin") {
      throw new HttpException("Access denied: Not an User", 403);
    }

    if ("status" in user && user.status === "blocked") {
      throw new Error("you have been blocked");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Incorrect password");
    const userId = user._id;
    const accessToken = jwt.sign({ userId, role: user.role }, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId, role: user.role }, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: "7d",
    });

    return { accessToken, refreshToken, user };
  }

  async refreshAccessToken(refreshToken: string): Promise<refreshedUser> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string; role: string };

      const userId = decoded.userId;
      const role = decoded.role;
      const newAccessToken = jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
      });

      const user = await this.authRepository.findUserById(decoded.userId);

      if (!user) {
        throw new Error("cannot find user please try again");
      }
      return { accessToken: newAccessToken, user };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async sendMagicLink(email: string): Promise<void> {
    try {
      const user = await this.authRepository.findUserByEmail(email);
      if (!user) throw new Error("Invalid email address");
      const token = jwt.sign({ userId: user._id, email, purpose: "reset-password" }, process.env.JWT_TOKEN_SECRET!, {
        expiresIn: "15m",
      });
      const magicLink = `${process.env.CLIENT_URL}/login?token=${token}`;
      await sendForgotPasswordMail(email, magicLink);
      await RedisClient.setex(`magicLink:${email}`, 900, JSON.stringify({ magicLink }));
      const link = await RedisClient.getex(`magicLink:${email}`);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const { userId, email, purpose } = await verifyResetToken(token, "reset-password");
      if (!userId || purpose !== "reset-password") {
        throw new Error("Invalid token");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await this.authRepository.updateUserPassword(userId, hashedPassword);

      await RedisClient.del(`magicLink:${email}`);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
