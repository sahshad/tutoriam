import { inject, injectable } from "inversify";
import { ILessonController } from "../core/interfaces/controller/ILessonController";

@injectable()
export class LessonController implements ILessonController{
  constructor(@inject("LessonService") private lessonService: ILessonController) {}
}