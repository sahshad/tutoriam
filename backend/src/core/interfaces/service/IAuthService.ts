import { refreshedUser, verifiedUer } from "../../types/userTypes";

export interface IAuthService {
  register(name: string, email: string, password: string): Promise<void>;
  verifyOtp(email: string, otp: string): Promise<verifiedUer>;
  resendOtp(email: string): Promise<void>;
  adminLogin(email: string, password: string): Promise<verifiedUer>;
  login(email: string, password: string): Promise<verifiedUer>;
  refreshAccessToken(refreshToken: string, role: string): Promise<refreshedUser>;
  sendMagicLink(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
}
