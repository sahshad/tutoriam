import { IUser } from "../../../models/User";
import { AdminDashboardStats } from "../../types/userTypes";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<IUser> {
  updateById(userId: string, updateData: Partial<IUser>): Promise<IUser | null>;
  findUserById(userId: string): Promise<IUser | null>;
  findUserByGoogleId(googleId: string): Promise<IUser | null>;
  getAdminDashboardData():Promise<AdminDashboardStats>
}
