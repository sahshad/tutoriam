import { BaseRepository } from "../core/abstracts/base.repository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { IUser, User } from "../models/User";

export class UserRepository extends BaseRepository<IUser> implements IUserRepository {
  constructor() {
    super(User);
  }
  
  async updateById(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async findUserById(userId: string):Promise<IUser| null> {
    return await User.findById(userId)
  }

  async findUserByGoogleId(googleId: string):Promise<IUser | null> {
    return await User.findOne({googleId:googleId})
  }

}
