import { inject, injectable } from "inversify";
import { ILessonController } from "../core/interfaces/controller/ILessonController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";


@injectable()
export class LessonController implements ILessonController{
  constructor(@inject(TYPES.LessonService) private lessonService: ILessonService) {}

  createLesson = asyncHandler(async (req:Request, res:Response) => {
    console.log(req.body)
    const lessonData = req.body
    const file = req.file ? req.file : undefined;

    const lesson = await this.lessonService.createLesson(lessonData, file)
    res.status(StatusCodes.CREATED).json(lesson)
  })

  updateLesson = asyncHandler(async (req:Request, res:Response) => {
    const {lessonId} = req.params
    const data = req.body
    const file = req.file ? req.file : undefined;
  
    const lesson = await this.lessonService.updateLesson(lessonId, data,file)
    res.status(StatusCodes.OK).json({message: "lesson updated successfully", lesson})
  })

  deleteLesson = asyncHandler(async (req: Request, res: Response) => {
    const {lessonId} = req.params
    const lesson = await this.lessonService.deleteLesson(lessonId)
    res.status(StatusCodes.OK).json({message: "lesson delete successfully"})
  })
}