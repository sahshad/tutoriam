import { IUser } from "../../../models/User";

export interface IAdminRepository {
  getUsers(): Promise<IUser[]>;
  toggleUserStatus(userId: string): Promise<IUser | null>;
}
