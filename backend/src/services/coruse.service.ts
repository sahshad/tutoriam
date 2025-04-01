import { inject, injectable } from "inversify";
import { BaseService } from "../core/abstracts/base.service";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { Course, ICourse } from "../models/Course";
import { TYPES } from "../di/types";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";

@injectable()
export class CourseService extends BaseService<ICourse> implements ICourseService {
    constructor(@inject(TYPES.CourseRepository) private courseRepository: ICourseRepository) {
        super(courseRepository);
    }
  async createCourse(courseData: Partial<ICourse>): Promise<ICourse | null> {
    return await this.courseRepository.create(courseData);
  }

 async getCoursesByInstructorId(instructorId: string): Promise<ICourse[] | null> {
     return await this.courseRepository.getCoursesByInstructorId(instructorId)
 }

 async updatePublishStatus(courseId: string): Promise<ICourse > {
     const course = await this.courseRepository.updateCoursePublishStatus(courseId)
     if(!course)
      throw new Error("cannot update course. please try agina")
    return course
 }

 async getAllCourses(): Promise<ICourse[] | null> {
     return await this.courseRepository.getAllCourses()
 }

 async getFullCourse(courseId: string): Promise<ICourse | null> {
     const course = await this.courseRepository.getCourseWithModulesAndLessons(courseId)
     if(!course)
      throw new Error("cannot find course. please try again")

     return course
 }
}
