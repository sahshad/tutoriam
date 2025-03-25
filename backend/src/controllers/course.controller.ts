import { inject, injectable } from "inversify";
import { ICourseController } from "../core/interfaces/controller/ICourseController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { ICourseService } from "../core/interfaces/service/ICourseService";

@injectable()
export class CourseController implements ICourseController {
    constructor(@inject(TYPES.CourseService) private courseService: ICourseService) {}

    createCourse = asyncHandler(async (req: Request, res: Response): Promise<void> => {
        // const { name, description, } = req.body;
        // const course = await this.courseService.createCourse(name, description, modules);
        // res.status(StatusCodes.CREATED).json(course);
    });
}