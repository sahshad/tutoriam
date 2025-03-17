import mongoose, { Document, Schema } from "mongoose";

// export interface ITutor extends Document {
//   userId: mongoose.Schema.Types.ObjectId;
//   skills: string[];
//   bio: string;
//   courses:mongoose.Schema.Types.ObjectId[]
//   socialLinks: {
//     linkedin: string;
//     github: string;
//     portfolio: string;
//   };
//   paymentInfo: {
//     paypalId: string;
//     stripeId: string;
//   };
//   adminApproval: {
//     status: "pending" | "approved" | "rejected";
//     reason?: string;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// }

// const TutorSchema = new Schema<ITutor>(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     skills: { type: [String], required: true },
//     bio: { type: String },
//     courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
//     socialLinks: {
//       linkedin: { type: String },
//       github: { type: String },
//       portfolio: { type: String },
//     },
//     paymentInfo: {
//       paypalId: { type: String },
//       stripeId: { type: String },
//     },
//     adminApproval: {
//       status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
//       reason: { type: String },
//     },
//   },
//   { timestamps: true }
// );

// export const Tutor = mongoose.model<ITutor>("Tutor", TutorSchema);


const TutorSchema = new Schema(
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        subjects: { type: [String], required: true },
        
        bio: { type: String },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
        socialLinks: {
          linkedin: { type: String },
          github: { type: String },
          portfolio: { type: String },
        },
        paymentInfo: {
          paypalId: { type: String },
          stripeId: { type: String },
        },
        adminApproval: {
          status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
          reason: { type: String },
        },
      },
      { timestamps: true }
    );