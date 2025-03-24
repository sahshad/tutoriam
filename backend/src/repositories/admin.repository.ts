import { injectable } from "inversify";
import { IAdminRepository } from "../core/interfaces/repository/IAdminRepository";
import { IUser, User } from "../models/User";
import { BaseRepository } from "../core/abstracts/base.repository";
import { Admin, IAdmin } from "../models/Admin";

@injectable()
export class AdminRepositor implements IAdminRepository{

  async getUsers(): Promise<IUser[]> {
    return await User.find({ role: "user" });
  }

  async toggleUserStatus(userId: string): Promise<IUser|null> {
    const user: IUser | null = await User.findById(userId);

    if (!user) throw new Error("user not found");

    user.status = user.status === "active" ? "blocked" : "active";

    await user.save();
    return user;
  }
}
