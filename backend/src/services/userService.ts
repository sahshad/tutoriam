import { IUser } from "../models/User";
import bcrypt from 'bcryptjs'
import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository()

export class UserService {
  async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ) {
    return  userRepository.updateById(userId, updateData)
  }

  async changePassword(userId:string,currentPassword:string, newPassword:string){
    try {
        const user = await userRepository.findUserById(userId)
        if(!user)
            throw new Error("invalid userId")

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password)
        console.log(isPasswordValid)
        if(!isPasswordValid)
            throw new Error("incorrect current password")
        

        const hashedPassword = await this.hashPassword(newPassword)

        return userRepository.updateById(userId, {password:hashedPassword})

    } catch (error) {
        return new Error("error while changing password")
    }
  }

  async getUserProfile(userId: string){
    try {
      const user = await userRepository.findUserById(userId)
      if(!user){
        throw new Error("invalid userId")
      }

      return user
    } catch (error) {
      console.error(error)
      throw new Error("error while fetching user")
    }
  }

  private async hashPassword(password: string) {
      return await bcrypt.hash(password, 10);
    }
}
