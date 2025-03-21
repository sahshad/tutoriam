import { IInstructor } from "../../../models/Instructor";

export interface IInstructorService {
    getInstructorApplications():Promise<IInstructor[]|null>
}