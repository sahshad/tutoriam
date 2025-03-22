import { inject, injectable } from "inversify";
import { IAdminService } from "../core/interfaces/service/IAdminService";
import { IUser } from "../models/User";
import { IAdminRepository } from "../core/interfaces/repository/IAdminRepository";
import { TYPES } from "../di/types";
import { IInstructor } from "../models/Instructor";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";

@injectable()
export class AdminService implements IAdminService {
    constructor(@inject(TYPES.AdminRepository) private adminRepository:IAdminRepository,
    @inject(TYPES.InstructorRepository) private instructorRepository: IInstructorRepository,
    @inject(TYPES.UserRepository) private userRepository : IUserRepository
){}

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

   reviewTutorApplication = async(tutorId: string, status: string, reason?: string) :Promise<IInstructor|null> => {
    try {
        if (!["approved", "rejected"].includes(status)) {
          throw new Error("Invalid status. Must be 'approved' or 'rejected'.");
        }
  
        const updatedInstructor =  await  this.instructorRepository.updateInstructorStatus(tutorId, {
          "adminApproval.status": status,
         "adminApproval.reason" : reason ? reason : ''
        });
  
        if (!updatedInstructor) {
          throw new Error("instructor not found");
        }

        const InstructorStatus:any = updatedInstructor.adminApproval.status

        if( InstructorStatus === 'approved'){
           const instructor = await this.userRepository.updateById(updatedInstructor.userId as string, {role:"instructor"})
           if(!instructor){
            throw new Error("user not found")
           }
        }
  
        return updatedInstructor;
      } catch (error) {
        console.error("Error updating tutor status:", error);
        throw error
      }
   }
}