import { IAdmin } from "../../models/Admin"
import { ICourse } from "../../models/Course";
import { IUser } from "../../models/User"

export interface verifiedUer {
   accessToken:string,
   refreshToken:string,
   user:IUser|IAdmin
}

export interface refreshedUser {
    accessToken:string,
    user: IUser|IAdmin
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
    courses: ICourse[] | null ; 
  }
  
