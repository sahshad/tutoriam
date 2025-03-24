import { IInstructor } from "../../../models/Instructor";
import { IBaseRepository } from "./IBaseRepository";

export interface IInstructorRepository extends IBaseRepository<IInstructor> {
    createInstructor(instructor:Partial<IInstructor>):Promise<IInstructor | null>
    getInstructorApplications():Promise<IInstructor[]|null>
    updateInstructorStatus(id:string, updates:{}):Promise<IInstructor| null>
    getInstructors():Promise<IInstructor[]  | null>
    findInstructorByUserId(userId:string):Promise<IInstructor|null>
}