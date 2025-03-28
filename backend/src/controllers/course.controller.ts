import { inject, injectable } from "inversify";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { uploadImageToCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";

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
}