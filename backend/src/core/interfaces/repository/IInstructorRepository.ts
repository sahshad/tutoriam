import { IInstructor } from "../../../models/Instructor";

export interface IInstructorRepository {
    createInstructor(instructor:Partial<IInstructor>):Promise<IInstructor | null>
    getInstructorApplications():Promise<IInstructor[]|null>
    updateInstructorStatus(id:string, updates:{}):Promise<IInstructor| null>
}