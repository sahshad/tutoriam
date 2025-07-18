import { LoginResponseDTO } from "../../dtos/response/auth.response.dto";
import { UserResponseDTO } from "../../dtos/response/user.response.dto";
import { ICourse } from "../../models/Course";
import { IEnrollment } from "../../models/Enrollment";
import { IInstructor } from "../../models/Instructor";
import { IOrder } from "../../models/Order";
import { IUser } from "../../models/User";

export interface verifiedUer {
  accessToken: string;
  refreshToken: string;
  user: LoginResponseDTO 
}

export interface refreshedUser {
  accessToken: string;
  user: IUser 
}

export interface AdminDashboardStats {
  totalUsers: number | null;
  totalTutors: number | null;
  totalCourses: number | null;
}

export interface PaginatedCoursesResponse {
  totalCourses: number;
  totalPages: number;
  currentPage: number;
  courses: ICourse[] | null;
}

export interface PaginatedInstructorsResponse {
  totalInstructors: number;
  totalPages: number;
  currentPage: number;
  instructors: IInstructor[] | null;
}

export interface DashboardData {
  enrolledCourses: number
  activeCourses: number
  completedCourses: number
  instructors: number
  enrollments: IEnrollment[] | null
}

export interface PaginatedUsersResponse {
  totalUsers: number;
  totalPages: number;
  currentPage: number;
  users: UserResponseDTO[] | null;
}

export interface PaginatedOrdersResponse {
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  orders: IOrder[] | null;
}

export interface EnrolledStudent {
  user: Partial<IUser>;
  enrollmentDate: Date;
}

export interface InstructorRating {
  averageRating: number
  totalReviews: number
  breakdown: {
    rating: number;
    count: any;
    percentage: number;
}[]
}

export interface InstructorStats {
  coursesSold: number;
  studentCount: number;
}
