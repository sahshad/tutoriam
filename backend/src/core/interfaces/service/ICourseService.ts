import { ICourse } from "../../../models/Course";
import { IBaseService } from "./IBaseService";

export interface ICourseService extends IBaseService<ICourse> {
 createCourse(courseData: any): Promise<ICourse | null>;
 getCoursesByInstructorId(instructorId:string):Promise<ICourse[] | null>
 getFullCourse(courseId:string) : Promise<ICourse|null>
 updatePublishStatus(courseId:string) : Promise<ICourse | null>
 getAllCourses():Promise<ICourse[] | null>
}