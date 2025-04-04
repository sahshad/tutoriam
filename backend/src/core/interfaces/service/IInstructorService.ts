import { IInstructor } from "../../../models/Instructor";

export interface IInstructorService {
    getInstructorApplications():Promise<IInstructor[]|null>
    getInstructors():Promise<IInstructor[]|null>
    getInstructorProfile(instructorId: string):Promise<IInstructor | null>
}