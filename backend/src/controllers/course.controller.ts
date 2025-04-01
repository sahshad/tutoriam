import { inject, injectable } from "inversify";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { deleteImageFromCloudinary, deleteVideoFromCloudinary, uploadImageToCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { STATUS_CODES } from "http";

@injectable()
export class CourseController implements ICourseController {
    constructor(@inject(TYPES.CourseService) private courseService: ICourseService) {}

    createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        let  courseData = req.body
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const thumbnail = await uploadImageToCloudinary(files.thumbnail[0].buffer, 'course/thumbnail')
        const trailer = await uploadVideoToCloudinary(files.trailer[0].buffer, 'course/trailer')
        courseData.thumbnail = thumbnail
        courseData.trailer = trailer
        courseData.instructorId = req.user?._id

        const course = await this.courseService.createCourse(req.body);
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
        const courses = await this.courseService.getAllCourses()
        res.status(StatusCodes.OK).json({message: "courses fetched successfully", courses})
    })

    getCourseWithContent = asyncHandler(async(req:Request, res:Response) => {
        const {courseId} = req.params
        const course = await this.courseService.getFullCourse(courseId)
        res.status(StatusCodes.OK).json(course)
    })

    updateCourse = asyncHandler(async (req:Request, res: Response) => {
        const {courseId} = req.params
        const existingCourse = await this.courseService.findById(courseId)
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const data = req.body

        if (files?.thumbnail && files.thumbnail.length > 0) {
            await deleteImageFromCloudinary(existingCourse?.thumbnail as string)
            data.thumbnail = await uploadImageToCloudinary(files.thumbnail[0].buffer, 'course/thumbnail' )
        }

        if(files?.trailer && files.trailer.length > 0){
            await deleteVideoFromCloudinary(existingCourse?.trailer as string)
            data.trailer = await uploadVideoToCloudinary(files.trailer[0].buffer, 'course/trailer')
        }

        const course = await this.courseService.update(courseId,data)
        res.status(StatusCodes.OK).json({message: "course updated successfully", course})
    })
}