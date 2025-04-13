import { FilterQuery } from "mongoose";
import { IEnrollment } from "../../../models/Enrollment";
import { IBaseService } from "./IBaseService";

export interface getUserEnrollmentsArgument {
  page: number;
  limit: number;
  search: string;
  filter: string | FilterQuery<IEnrollment>;
}

export interface IEnrollmentService extends IBaseService<IEnrollment> {
  isUserEnrolled(userId: string, courseId: string): Promise<boolean>;
  enrollUserInCourses(userId: string, courseIds: string[]): Promise<void>;
  enrollUserIntoCourse(userId: string, courseId: string): Promise<void>;
  getUserEnrollments(
    arg0: getUserEnrollmentsArgument,
    userId: string
  ): Promise<{ data: IEnrollment[]; totalItems: number; totalPages: number; currentPage: number }>;
  completeLesson(userId: string, courseId: string, lessonId: string): Promise<IEnrollment | null>;
  updateLastVisitedLesson(
    filter: FilterQuery<IEnrollment>,
    lessonId: string
  ): Promise<IEnrollment | null>
}
