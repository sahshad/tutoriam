import { inject, injectable } from "inversify";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { deleteImageFromCloudinary, deleteVideoFromCloudinary, uploadImageToCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";
import { Instructor } from "../models/Instructor";

@injectable()
export class CourseController implements ICourseController {
    constructor(@inject(TYPES.CourseService) private courseService: ICourseService) {}

    createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        let  courseData = req.body
        console.log(courseData)
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        courseData.instructorId = req.user?._id

        const course = await this.courseService.createCourse(courseData, files);
        res.status(StatusCodes.CREATED).json(course);
    });

    getMyCourses = asyncHandler(async(req:Request, res: Response) => {
        const { page, limit, searchQuery, category, subCategory, sortBy } = req.query;
        console.log(searchQuery,sortBy)
        const instructorId = req.user?._id
        const coursesWithPagination = await this.courseService.getMycourses({
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            search: searchQuery as string || '',
            category: category as string || '',
            subCategory: subCategory as string || '',
            sortBy: sortBy as string || 'createdAt',
        }, instructorId as string);

        res.status(StatusCodes.OK).json({message: "courses fetched successfully", coursesWithPagination})
        // const courses = await this.courseService.getCoursesByInstructorId(userId as string)
        // res.status(StatusCodes.OK).json(courses)
    })

    updatePublishStatus = asyncHandler(async (req: Request, res: Response) => {
        const {courseId } = req.params
        const course = await this.courseService.updatePublishStatus(courseId)
        res.status(StatusCodes.OK).json({message: "course updated successfully" ,course})
    })

    getAllCourses = asyncHandler(async (req: Request, res: Response) => {
        const { page, limit, sortBy, sortOrder, category, subCategory, searchQuery } = req.query;
        console.log(subCategory, sortBy, searchQuery)
        const coursesWithPagination = await this.courseService.getAllCourses({
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            sortBy: sortBy as string || 'createdAt',
            searchQuery: searchQuery as string || '',            
            subCategory: subCategory as string [] || ['all']

        });

        res.status(StatusCodes.OK).json({message: "courses fetched successfully", coursesWithPagination})
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