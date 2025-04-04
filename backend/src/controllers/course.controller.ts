import { inject, injectable } from "inversify";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { deleteImageFromCloudinary, deleteVideoFromCloudinary, uploadImageToCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";

@injectable()
export class CourseController implements ICourseController {
    constructor(@inject(TYPES.CourseService) private courseService: ICourseService) {}

    createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        let  courseData = req.body
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        courseData.instructorId = req.user?._id

        const course = await this.courseService.createCourse(courseData, files);
        res.status(StatusCodes.CREATED).json(course);
    });

    getMyCourses = asyncHandler(async(req:Request, res: Response) => {
        const userId = req.user?._id
        const courses = await this.courseService.getCoursesByInstructorId(userId as string)
        res.status(StatusCodes.OK).json(courses)
    })

    updatePublishStatus = asyncHandler(async (req: Request, res: Response) => {
        const {courseId } = req.params
        const course = await this.courseService.updatePublishStatus(courseId)
        res.status(StatusCodes.OK).json({message: "course updated successfully" ,course})
    })

    getAllCourses = asyncHandler(async (req: Request, res: Response) => {
        const { page, limit, search, sortBy, sortOrder } = req.query;
        const coursesWithPagination = await this.courseService.getAllCourses({
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            search: search as string || '',
            sortBy: sortBy as string || 'createdAt',
            sortOrder: sortOrder as string || 'asc'
        });


        res.status(StatusCodes.OK).json({message: "courses fetched successfully", courses:coursesWithPagination?.courses})
    })

    getCourseWithContent = asyncHandler(async(req:Request, res:Response) => {
        const {courseId} = req.params
        const course = await this.courseService.getFullCourse(courseId)
        console.log(course)
        res.status(StatusCodes.OK).json(course)
    })

    updateCourse = asyncHandler(async (req:Request, res: Response) => {
        const {courseId} = req.params
        const data = req.body
        const files = req.files ? req.files as { [fieldname: string]: Express.Multer.File[] } : undefined;

        const course = await this.courseService.updateCourse(courseId,data,files)
        res.status(StatusCodes.OK).json({message: "course updated successfully", course})
    })
}