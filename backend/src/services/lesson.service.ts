import { inject, injectable } from "inversify";
import { BaseService } from "../core/abstracts/base.service";
import { ILessonService } from "../core/interfaces/service/ILessonService";
import { ILesson, Lesson } from "../models/Lesson";
import { TYPES } from "../di/types";

@injectable()
export class LessonService extends BaseService<ILesson> implements ILessonService{
    constructor(@inject(TYPES.LessonRepository) private lessonRepository: ILessonService) {
        super(lessonRepository);
    }

}