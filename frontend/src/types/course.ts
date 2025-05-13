import { Lesson } from "./lessons";
import { Module } from "./module";
import { IUser } from "./user";

export interface Course {
    _id: string;
    title: string;
    subtitle: string;
    categoryId: {name:string};
    subCategoryId: {name: string};
    categoryName: string,
    subCategoryName: string,
    language: string;
    level: "beginner" | "intermediate" | "advanced";
    thumbnail: string;
    trailer: string;
    description: string;
    whatYouWillLearn: string[];
    welcomeMessage: string;
    congratulationsMessage: string;
    targetAudience?: string;
    requirements?: string[];
    instructorId: string | IUser;
    modules?: Module[];
    status?: boolean
    price?: string;
    discountPrice?: number;
    rating?: number;
    enrollmentCount?: number;
    isFree: boolean;
    isPublic: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

  export interface FullCourse extends Partial<Course>, Partial<Module>, Partial<Lesson> {
    instructor:{}
  }

  export interface GetCoursesRequestParams {
    page?: number;        
    limit?: number;          
    searchQuery?: string;    
    category?: string;
    subCategory?: string;
    rating?: string;
    sortBy?: string;
  }

  export interface UserCourseFilterParams {
    page: number;
    limit: number;
    searchQuery: string;
    category?: string[]; 
    subCategory?: string[]; 
    sortBy: string; 
    priceMin: number; 
    priceMax: number; 
    level?: string[]; 
    duration?: string[]; 
  }
  
  
