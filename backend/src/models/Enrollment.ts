import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IEnrollment extends Document {
    userId: ObjectId;
    courseId: ObjectId;
    enrolledAt: Date;
    progress: {
      completedLessons: mongoose.Types.ObjectId[];
      lastVisited?: mongoose.Types.ObjectId;
      percentage: number;
    };
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  const EnrollmentSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
      enrolledAt: { type: Date, default: Date.now },
      progress: {
        completedLessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
        lastVisited: { type: Schema.Types.ObjectId, ref: 'Lesson' },
        percentage: { type: Number, default: 0 }
      },
      completed: { type: Boolean, default: false }
    },
    { timestamps: true }
  );
  
  EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true }); 
  
  export default mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);
  