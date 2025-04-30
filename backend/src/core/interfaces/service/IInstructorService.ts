import { IInstructor } from "../../../models/Instructor";
import { PaginatedInstructorsResponse } from "../../types/userTypes";

export interface IInstructorService {
    getInstructorApplications():Promise<IInstructor[]|null>
    getInstructors():Promise<IInstructor[]|null>
    getInstructorProfile(instructorId: string):Promise<IInstructor | null>
    getUserApplications(userId: string):Promise<IInstructor[]|null>
    reviewTutorApplication(tutorId: string, status: string, reason?: string) :Promise<IInstructor|null>
    getEnrolledInstructors(userId: string, page:number, limit:number, searchQuery?: string): Promise<PaginatedInstructorsResponse | null>

}