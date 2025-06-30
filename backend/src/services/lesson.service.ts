import { inject, injectable } from "inversify";
import { BaseService } from "../core/abstracts/base.service";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { ILesson, Lesson } from "../models/Lesson";
import { TYPES } from "../di/types";
import { deleteLessonFromCloudinary, deleteVideoFromCloudinary, uploadAuthenticatedVideoToCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";
import { ILessonRepository } from "../core/interfaces/repository/ILessonRepository ";

@injectable()
export class LessonService extends BaseService<ILesson> implements ILessonService {
  constructor(@inject(TYPES.LessonRepository) private lessonRepository: ILessonRepository) {
    super(lessonRepository);
  }

  async updateLesson(lessonId: string, data: Partial<ILesson>, file?: Express.Multer.File): Promise<ILesson | null> {
    const existingLesson = await this.lessonRepository.findById(lessonId);
    if(!existingLesson){
        throw new Error("cannot find lesson. please try again")
    }
    if (file) {
      await deleteLessonFromCloudinary(existingLesson.videoPublicId as string)
      const videoData = await uploadAuthenticatedVideoToCloudinary(file.buffer, "course/lesson");
      data.videoUrl = videoData?.url
      data.videoPublicId = videoData?.public_id
      data.duration = Math.floor(Number(videoData?.duration)).toString()
    }

    return await this.lessonRepository.update(lessonId, data)
  }

  async createLesson(data:Partial<ILesson>, file?:Express.Multer.File):Promise<ILesson |null> {
    
    if(!file){
        throw new Error("please provide the file for creating a lesson")
    }
     const videoData = await uploadVideoToCloudinary(file?.buffer, 'course/lesson')
     data.videoPublicId = videoData?.public_id 
     data.duration = Math.floor(Number(videoData?.duration)).toString()
     return await this.lessonRepository.create(data)
  }

  async deleteLesson (lessonId:string):Promise<ILesson | null>{
    const lesson = await this.lessonRepository.findById(lessonId)
    if(!lesson){
        throw new Error("cannot find the lesson, please try again")
    }

    await deleteLessonFromCloudinary(lesson.videoPublicId as string)
    return await this.lessonRepository.delete(lessonId)
  }
}
