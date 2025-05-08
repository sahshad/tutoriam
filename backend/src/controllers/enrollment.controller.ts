import { Request, Response } from "express";
import { IEnrollmentController } from "../core/interfaces/controller/IEnrollmentController";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IEnrollmentService } from "../core/interfaces/service/IEnrollmentService";
import { StatusCodes } from "http-status-codes";
import { ICourseService } from "../core/interfaces/service/ICourseService";

@injectable()
export class EnrollmentController implements IEnrollmentController{
    constructor(
        @inject(TYPES.EnrollmentService) private enrollmentService:IEnrollmentService,
        @inject(TYPES.CourseService) private courseService: ICourseService
    ){}

    isUserEnrolled= asyncHandler(async(req:Request, res:Response) : Promise<void> =>{
        const userId = req.user?._id as string
        const courseId = req.params.courseId as string

        const userEnrolled = await this.enrollmentService.isUserEnrolled(userId, courseId)
        res.status(StatusCodes.OK).json({userEnrolled})
        
    })

    completeLesson = asyncHandler(async(req:Request, res:Response) : Promise<void> => {
        const { lessonId } = req.body;
        const { courseId} = req.params
        const userId = req.user?._id;
        const enrollment = await this.enrollmentService.completeLesson(userId as string, courseId, lessonId);
        res.status(StatusCodes.OK).json({message:"lesson completed succeefully", enrollment});
    })

    enroll = asyncHandler(async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id as string
        const { courseId } = req.body;
         await this.enrollmentService.enrollUserInCourses(userId, [courseId]);
         const enrollment = await this.enrollmentService.isUserEnrolled(userId, courseId)
        res.status(StatusCodes.OK).json({ message: "Enrollment successful" , enrollment});
    })

    getEnrolledCourses= asyncHandler(async(req: Request, res:Response) :Promise<void> => {        
        const userId = req.user?._id;
        const {
            page = "1",
            limit = "10",
            search = "",
            filter = "all",
          } = req.query;
        
          const pageNumber = parseInt(page as string, 10);
          const limitNumber = parseInt(limit as string, 10);


         const enrollments = await this.enrollmentService.getUserEnrollments({
    page: pageNumber,
    limit: limitNumber,
    search: search as string,
    filter: filter as string,
  }, userId as string);  
  
        res.status(StatusCodes.OK).json({message:"enrollment fetched succeefully",enrollments});

    })

    getOneEnrolledCourse = asyncHandler(async(req: Request, res:Response) :Promise<void> => {
        const userId = req.user?._id
        const {courseId} = req.params
        const enrolledCourse = await this.enrollmentService.findOne({userId,courseId})
        const courseWithModulesAndLessons = await this.courseService.getFullCourse(courseId)

        res.status(StatusCodes.OK).json({message:"enrolled course fetched successfully", enrolledCourse, courseWithModulesAndLessons})
    })

    updateLastVisitedLesson = asyncHandler(async(req: Request, res:Response) :Promise<void> =>{
        const userId = req.user?._id
        const { lessonId} = req.body
        const { courseId} = req.params
        const enrollment = await this.enrollmentService.updateLastVisitedLesson({userId, courseId}, lessonId)

        res.status(StatusCodes.OK).json({message: "last visited lesson updated successfully", enrollment})
    })

    getEnrolledStudentsOfACourse = asyncHandler(async(req: Request, res:Response) :Promise<void> =>{
        const { courseId} = req.params
        const enrolledStudents = await this.enrollmentService.getEnrolledStudentsOfACourse(courseId)
        res.status(StatusCodes.OK).json({message: "enrolled users fetched succeefully", enrolledStudents})
    })
}