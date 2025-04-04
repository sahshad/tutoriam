import { inject, injectable } from "inversify";
import { IInstructor } from "../models/Instructor";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";

@injectable()
export class InstructorService implements IInstructorService{
    constructor(@inject(TYPES.InstructorRepository) private instructorRepository:IInstructorRepository){}
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
}