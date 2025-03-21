import { inject, injectable } from "inversify";
import { IInstructor } from "../models/Instructor";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { errorMonitor } from "events";

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
}