import { inject, injectable } from "inversify";
import { ILessonController } from "../core/interfaces/controller/ILessonController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { uploadVideoToCloudinary } from "../utils/clodinaryServices";

@injectable()
export class LessonController implements ILessonController{
  constructor(@inject(TYPES.LessonService) private lessonService: ILessonService) {}

  createLesson = asyncHandler(async (req:Request, res:Response) => {
    console.log(req.body)
    const lessonData = req.body
    let content
    if(req.file?.buffer)
     content = await uploadVideoToCloudinary(req.file?.buffer, 'course/lesson')
    lessonData.videoUrl = content
    const lesson = await this.lessonService.create(lessonData)
    res.status(StatusCodes.CREATED).json(lesson)
  })
}