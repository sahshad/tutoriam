import { inject, injectable } from "inversify";
import { ILessonController } from "../core/interfaces/controller/ILessonController";
import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { deleteImageFromCloudinary, deleteVideoFromCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

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

  updateLesson = asyncHandler(async (req:Request, res:Response) => {
    const {lessonId} = req.params
    const data = req.body
    console.log(data, lessonId)
    const existingLesson = await this.lessonService.findById(lessonId)
    if(req.file?.buffer){
       await deleteImageFromCloudinary(existingLesson?.videoUrl as string)
      data.videoUrl = await uploadVideoToCloudinary(req.file.buffer, 'course/lesson')
    }

    const lesson = await this.lessonService.update(lessonId, data)
    res.status(StatusCodes.OK).json({message: "lesson updated successfully", lesson})
  })

  deleteLesson = asyncHandler(async (req: Request, res: Response) => {
    const {lessonId} = req.params
    const lesson = await this.lessonService.delete(lessonId)
    await deleteVideoFromCloudinary(lesson?.videoUrl as string)
    res.status(StatusCodes.OK).json({message: "lesson delete successfully"})
  })
}