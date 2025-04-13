import { Course } from "./course";

export interface EnrolledCourse {
    _id:string
    userId: string;
    courseId: Course;
    enrolledAt: Date;
    progress: {
        totalLessons:number
      completedLessons: string[] ;
      lastVisited?: string 
      percentage: number;
    };
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }