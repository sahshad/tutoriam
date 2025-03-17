import { IUser, User } from "../models/User";

export class AdminRepository {
  async getUsers() {
    return User.find({ role: "user" });
  }

  async toggleUserStatus(userId: string) {
    const user: IUser | null = await User.findById(userId);

    if (!user) throw new Error("user not found");

    user.status = user.status === "active" ? "blocked" : "active";

    await user.save();
    return user;
  }
}
