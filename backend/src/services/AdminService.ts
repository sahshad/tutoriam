import { inject, injectable } from "inversify";
import { IAdminService } from "../core/interfaces/service/IAdminService";
import { IUser } from "../models/User";
import { IAdminRepository } from "../core/interfaces/repository/IAdminRepository";
import { TYPES } from "../di/types";

@injectable()
export class AdminService implements IAdminService {
    constructor(@inject(TYPES.AdminRepository) private adminRepository:IAdminRepository){}

    getUsers = async():Promise<IUser[]> =>{
    try {
        const users = await this.adminRepository.getUsers()
        return users
    } catch (error) {
        throw new Error("error while fetching all users")
    }
   }

    toggleUserStatus = async(userId:string):Promise<IUser| null> =>{
    try {
        const user = await this.adminRepository.toggleUserStatus(userId)
        return user 
    } catch (error:any) {
        throw new Error(error)
    }
   }
}