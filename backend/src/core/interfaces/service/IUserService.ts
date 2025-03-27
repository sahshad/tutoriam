import { IInstructor } from "../../../models/Instructor";
import { IUser } from "../../../models/User";

export interface IUserService {
  updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser>;
  changePassword(userId: string,currentPassword: string,newPassword: string): Promise<IUser>;
  getUserProfile(userId: string): Promise<IUser>;
  becomeInstructor(instructorData:Partial<IInstructor>): Promise<IInstructor|null>
  findUserByGoogleId(googleId:string):Promise<IUser | null>
  createGoogleUser(name:string, email:string, profileImageUrl?:string,googleId?:string): Promise<IUser | null>
}
