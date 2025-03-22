import mongoose, { Document, Schema } from "mongoose";

export interface IInstructor extends Document {
  userId: mongoose.Schema.Types.ObjectId | string;
  courses: mongoose.Schema.Types.ObjectId[];
  idCardImageUrl: string;
  education: {
    highestDegree: string;
    institution: string;
    graduationYear: string;
    fieldOfStudy: string;
  };
  experience: string;
  currentOccupation: string;
  skills: string[];
  preferredSubjects: string[];
  teachingLanguages: string[];
  bio: string;
  socialLinks: {
    linkedin: { type: String };
    github: { type: String };
    portfolio: { type: String };
  };
  adminApproval: {
    status: {
      type: String;
      enum: ["pending", "approved", "rejected"];
      default: "pending";
    };
    reason: { type: String };
  };
  createdAt: Date;
  updatedAt: Date;
}

const InstructorSchema = new Schema<IInstructor>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Course",
      required: false,
    },
    idCardImageUrl: { type: String, required: true },
    education: {
      highestDegree: { type: String, required: true },
      institution: { type: String, required: true },
      graduationYear: { type: String, required: true, match: /^\d{4}$/ },
      fieldOfStudy: { type: String, required: true },
    },
    experience: { type: String, required: true, minlength: 10 },
    currentOccupation: { type: String, required: true, minlength: 2 },
    skills: { type: [String], required: true, min: 1 },
    preferredSubjects: { type: [String], required: true, min: 1 },
    teachingLanguages: { type: [String], required: true, min: 1 },
    bio: { type: String, required: true, minlength: 50, maxlength: 500 },
    socialLinks: {
      linkedin: { type: String, required: false },
      github: { type: String, required: false },
      portfolio: { type: String, required: false },
    },
    adminApproval: {
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      reason: { type: String, required: false },
    },
  },
  { timestamps: true }
);

export const Instructor = mongoose.model<IInstructor>("Instructor", InstructorSchema);
