import { inject, injectable } from "inversify";
import { IInstructor } from "../models/Instructor";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { IEnrollmentRepository } from "../core/interfaces/repository/IEnrollmentRepository";
import { PaginatedInstructorsResponse } from "../core/types/userTypes";
import { BaseService } from "../core/abstracts/base.service";

@injectable()
export class InstructorService implements IInstructorService{
    constructor(
        @inject(TYPES.InstructorRepository) private instructorRepository:IInstructorRepository,
        @inject(TYPES.UserRepository) private userRepository: IUserRepository,
        @inject(TYPES.EnrollmentRepository) private enrollmentRepository: IEnrollmentRepository,
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

    async updateInstructorProfile(instructorId: string, data: Partial<IInstructor>): Promise<IInstructor | null> {
        return await this.instructorRepository.updateInstructorProfile(instructorId, data)
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

       async getEnrolledInstructors(userId: string, page:number, limit:number, searchQuery?: string): Promise<PaginatedInstructorsResponse | null> {
            const instructorIds = await this.enrollmentRepository.findDistinctInstructors(userId)

            const skip = (Number(page) - 1) * Number(limit);

            const instructors = await this.instructorRepository.findInstructorsByUserId(instructorIds, skip, limit, searchQuery)
            
            return {
                totalInstructors:instructorIds.length,
                totalPages: Math.ceil(instructorIds.length / limit),
                currentPage: page,
                instructors
              };
       }

       async getAllInstructors(page: number, limit: number, searchQuery?: string): Promise<PaginatedInstructorsResponse | null>{
        const skip = (Number(page) - 1) * Number(limit);
        
        const instructors = await this.instructorRepository.findAllInstructors( skip, limit, searchQuery)
        const totalInstructors = await this.instructorRepository.countDocuments({"adminApproval.status": "approved"})
        return {
            totalInstructors,
            totalPages: Math.ceil(totalInstructors / limit),
            currentPage: page,
            instructors
          };
       }
}