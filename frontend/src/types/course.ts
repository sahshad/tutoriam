import { Lesson } from "./lessons";
import { Module } from "./module";

export interface Course {
    _id: string;
    title: string;
    subtitle: string;
    category: string;
    subCategory: string;
    language: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: string;
    thumbnail: string;
    trailer: string;
    description: string;
    whatYouWillLearn: string[];
    welcomeMessage: string;
    congratulationsMessage: string;
    targetAudience?: string;
    requirements?: string[];
    instructorId: string;
    modules?: Module[];
    status?: "draft" | "published" | "archived";
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
  
  
