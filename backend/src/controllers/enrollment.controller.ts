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
        const userId = req.user?._id
        const {courseId} = req.body

        const userEnrolled = this.enrollmentService.isUserEnrolled(userId as string, courseId)
        res.status(StatusCodes.OK).json({isUserEnrolled:userEnrolled})
        
    })

    completeLesson = asyncHandler(async(req:Request, res:Response) : Promise<void> => {
        const { courseId, lessonId } = req.body;
        const userId = req.user?._id;
        const enrollment = await this.enrollmentService.completeLesson(userId as string, courseId, lessonId);
        res.status(StatusCodes.OK).json({message:"lesson completed succeefully", enrollment});
    })

    enroll = asyncHandler(async(req: Request, res:Response) :Promise<void> => {
        const { userId, courseIds } = req.body;
        await this.enrollmentService.enrollUserInCourses(userId, courseIds);
        res.status(StatusCodes.OK).json({ message: "Enrollment successful" });
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
        const {courseId, lessonId} = req.body
        const enrollment = await this.enrollmentService.updateLastVisitedLesson({userId, courseId}, lessonId)

        res.status(StatusCodes.OK).json({message: "last visited lesson updated successfully", enrollment})
    })
}