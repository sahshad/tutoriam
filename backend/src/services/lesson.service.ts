import { inject, injectable } from "inversify";
import { BaseService } from "../core/abstracts/base.service";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { ILesson, Lesson } from "../models/Lesson";

@injectable()
export class LessonService extends BaseService<ILesson> implements ILessonService{
    constructor(@inject("LessonRepository") private lessonRepository: ILessonService) {
        super(lessonRepository);
    }

}