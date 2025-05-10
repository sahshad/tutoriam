import { inject, injectable } from "inversify";
import { getUserEnrollmentsArgument, IEnrollmentService } from "../core/interfaces/service/IEnrollmentService";
import { TYPES } from "../di/types";
import { IEnrollmentRepository } from "../core/interfaces/repository/IEnrollmentRepository";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { ILessonRepository } from "../core/interfaces/repository/ILessonRepository ";
import { IEnrollment } from "../models/Enrollment";
import { BaseService } from "../core/abstracts/base.service";
import { FilterQuery } from "mongoose";
import { EnrolledStudent, InstructorStats } from "../core/types/userTypes";

@injectable()
export class EnrollmentService extends BaseService<IEnrollment> implements IEnrollmentService {
  constructor(
    @inject(TYPES.EnrollmentRepository) private enrollmentRepository: IEnrollmentRepository,
    @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.LessonRepository) private lessonRepository: ILessonRepository
  ) {
    super(enrollmentRepository);
  }

  async isUserEnrolled(userId: string, courseId: string): Promise<IEnrollment | null> {
    return this.enrollmentRepository.isUserEnrolled(userId, courseId);
  }

  async enrollUserInCourses(userId: string, courseIds: string[]) {
    for (const courseId of courseIds) {
      const course = await this.courseRepository.findById(courseId);
      if (!course) continue;

      const instructorId = course.instructorId.toString()
      const totalLessons = await this.lessonRepository.countDocuments({ courseId: courseId });
      
      await this.enrollmentRepository.createEnrollment(userId, courseId,instructorId, totalLessons);

      await this.userRepository.updateWithOperators(userId, { $addToSet: { enrolledCourses: courseId } });
      await this.courseRepository.updateWithOperators(courseId, { $inc: { enrolledCount: 1 } });
    }
  }

  async enrollUserIntoCourse(userId: string, courseId: string): Promise<void> {
    const course = await this.courseRepository.findById(courseId);
    if (!course) {
      throw new Error("course not found");
    }
    const instructorId = course.instructorId.toString()
    const totalLessons = await this.lessonRepository.countDocuments({ courseId: courseId });
    console.log(totalLessons);
    await this.enrollmentRepository.createEnrollment(userId, courseId,instructorId, totalLessons);

    // await this.userRepository.updateWithOperators(userId, { $addToSet: { enrolledCourses: courseId } });
    await this.courseRepository.updateWithOperators(courseId, { $inc: { enrollmentCount: 1 } });
  }

  // async getUserEnrollments({page=1, limit=12, search='', sortBy='latest', status='all'}:getUserEnrollmentsArgument,userId:string) {

  //   let query:any
  //   if (search) {
  //     query["$or"] = [
  //       { "courseId.title": { $regex: search, $options: "i" } },
  //       { "courseId.subtitle": { $regex: search, $options: "i" } },
  //     ];
  //   }

  //   // Filter by status
  //   if (status && status !== "all") {
  //     query.status = status;
  //   }

  //   // Sort
  //   let sort: any = {};
  //   switch (sortBy) {
  //     case "latest":
  //       sort = { createdAt: -1 };
  //       break;
  //     case "oldest":
  //       sort = { createdAt: 1 };
  //       break;
  //     case "a-z":
  //       sort = { "courseId.title": 1 };
  //       break;
  //     case "z-a":
  //       sort = { "courseId.title": -1 };
  //       break;
  //   }

  //   // Pagination
  //   const skip = (page - 1) * limit;

  //   // Count total matching

  //   // Query with populate
  //   const enrollments = await this.enrollmentRepository.find

  //   const total = await this.enrollmentRepository.countDocuments(query);
  //   return {
  //     data: enrollments,
  //     totalPages: Math.ceil(total / limit),
  //     currentPage: page,
  //     totalItems: total,
  //   };
  //   // return this.enrollmentRepository.findEnrollmentsByUser(userId);
  // }

  async getUserEnrollments(
    { page = 1, limit = 12, search = "", filter = "all" }: getUserEnrollmentsArgument,
    userId: string
  ) {
    const skip = (page - 1) * limit;

    const filterData: any = {
      userId,
    };

    switch (filter) {
      case "completed":
        filterData.completed = true;
        break;
      case "not-started":
        filterData["progress.percentage"] = { $eq: 0 };
        break;
      case "in-progress":
        filterData["progress.percentage"] = { $gt: 0, $lt: 100 };
        break;
    }

    const courses = (await this.enrollmentRepository.getEnrollmentsWithPagination(filterData, skip, limit)) as any;
    let filteredCourses = courses;

    if (search) {
      search.toLowerCase();

      filteredCourses = courses.filter((course: any) => {
        const title = course.courseId?.title?.toLowerCase() || "";
        const subtitle = course.courseId?.subtitle?.toLowerCase() || "";
        return title.includes(search) || subtitle.includes(search);
      });
    }
    const totalCourses = await this.enrollmentRepository.countDocuments({ userId });

    return {
      totalItems: totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
      data: filteredCourses,
    };
  }

  async completeLesson(userId: string, courseId: string, lessonId: string) {
    return await this.enrollmentRepository.updateLessonCompletion(userId, courseId, lessonId);
  }

  async updateLastVisitedLesson(
    filter: FilterQuery<IEnrollment>,
    lessonId: string
  ): Promise<IEnrollment | null> {
    return await this.enrollmentRepository.updateLastVisitedLesson(filter, lessonId)
  }

  async getEnrolledStudentsOfACourse(courseId: string): Promise<EnrolledStudent[] | null>{
    return await this.enrollmentRepository.getEnrolledStudentsOfACourse(courseId)
  }

  async getInstructorStats(instructorId: string): Promise<InstructorStats> {
      const [coursesSold, studentCount] = await Promise.all([
        this.enrollmentRepository.countEnrollmentsByInstructor(instructorId),
        this.enrollmentRepository.countDistinctStudentsByInstructor(instructorId),
      ]);

      return {
        coursesSold,
        studentCount,
      };
 
  }
}
