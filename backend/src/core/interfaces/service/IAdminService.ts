import { IUser } from "../../../models/User";

export interface IAdminService {
    getUsers(): Promise<IUser[]>;
    toggleUserStatus(userId: string): Promise<IUser|null>;
  }