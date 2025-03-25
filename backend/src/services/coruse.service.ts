import { inject, injectable } from "inversify";
import { BaseService } from "../core/abstracts/base.service";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { Course, ICourse } from "../models/Course";
import { TYPES } from "../di/types";

@injectable()
export class CourseService extends BaseService<ICourse> implements ICourseService {
    constructor(@inject(TYPES.CourseRepository) private courseRepository: ICourseService) {
        super(courseRepository);
    }
  async createCourse(courseData: any) {
    return await this.courseRepository.create(courseData);
  }

//   async listCourses() {
//     return await this.courseRepository.getAllCourses();
//   }
}
