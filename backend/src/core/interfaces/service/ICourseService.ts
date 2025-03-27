import { ICourse } from "../../../models/Course";
import { IBaseService } from "./IBaseService";

export interface ICourseService extends IBaseService<ICourse> {
 createCourse(courseData: any): Promise<ICourse | null>;
}