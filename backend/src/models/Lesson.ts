import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ILesson extends Document {
    moduleId: ObjectId;
    title: string;
    content: string;
    videoUrl?: string;
    order: number;
    attachments?: string[]; 
    createdAt?: Date;
    updatedAt?: Date;
}

const LessonSchema = new Schema<ILesson>(
    {
      moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
      title: { type: String, required: true },
      content: { type: String, required: true },
      videoUrl: { type: String },
      order: { type: Number, required: true },
      attachments: [{ type: String }], 
    },
    { timestamps: true }
  );
  
  export const Lesson = mongoose.model<ILesson>("Lesson", LessonSchema);