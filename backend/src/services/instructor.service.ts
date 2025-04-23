import { inject, injectable } from "inversify";
import { IInstructor } from "../models/Instructor";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";

@injectable()
export class InstructorService implements IInstructorService{
    constructor(
        @inject(TYPES.InstructorRepository) private instructorRepository:IInstructorRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository
    ){}
    async getInstructorApplications():Promise<IInstructor[]|null>{
        try {
            const instructorApplications = await this.instructorRepository.getInstructorApplications()
            if(!instructorApplications)
                throw new Error(" cannot find any applications")

            return instructorApplications
        } catch (error) {
            throw new Error(" cannot find any applications please try again")
        }
    }

    async getInstructors():Promise<IInstructor[]|null>{
        const instructors = await this.instructorRepository.getInstructors()
        if(!instructors)    
            throw new Error("no instructors found") 
        return instructors
    }

    async getInstructorProfile(instructorId: string):Promise<IInstructor | null>{
        const instructor = await this.instructorRepository.getInstructorProfile(instructorId)
        if(!instructor){
            throw new Error("instructor not found ")
        }
        return instructor
    }

    async getUserApplications(userId: string):Promise<IInstructor[]|null>{
        const applications = await this.instructorRepository.getUserApplications(userId)
        if(!applications){
            throw new Error("no applications found")
        }
        return applications
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