import mongoose, { ObjectId,Document, Schema } from "mongoose";

export interface ICourse extends Document {
    title: string;
    subtitle:string;
    category: string;
    subCategory: string;
    language: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: string; 
    thumbnail: string;
    trailer: string;
    description: string;
    whatYouWillLearn: string[];
    welcomeMessage: string;
    congratulationsMessage:string;
    targetAudience?: string;
    requirements?: string[];
    instructorId: ObjectId;
    modules?: ObjectId[];
    status?: "draft" | "published" | "archived";
    price?: string;
    discountPrice?: number;
    rating?: number;
    enrollmentCount?: number;
    isFree: boolean;
    isPublic:boolean;
    createdAt?: Date;
    updatedAt?: Date;
}


const CourseSchema = new Schema<ICourse>(
    {
      title: { type: String, required: true },
      subtitle:{type:String, required: true},
      category: { type: String, required: true },
      subCategory: { type: String, required: true },
      language: { type: String, required: true },
      level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
      duration: { type: String, required: true },
      thumbnail: { type: String, required: true },
      trailer: { type: String, required: true },
      description: { type: String, required: true },
      whatYouWillLearn: [{ type: String, required: true }],
      welcomeMessage: {type: String, required: true},
      congratulationsMessage: {type: String, required: true},
      // targetAudience: { type: String, required: true },
      // requirements: [{ type: String, required: true }],
      instructorId: { type: Schema.Types.ObjectId, ref: "Instructor", required: true },
      modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
      // status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
      isPublic:{type: Boolean},
      price: { type: Number, default: 0 },
      discountPrice: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      enrollmentCount: { type: Number, default: 0 },
      isFree: { type: Boolean, default: false },
    },
    { timestamps: true }
  );
  
  export const Course = mongoose.model<ICourse>("Course", CourseSchema);