import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  _id:string
  name: string;
  email: string;
  password: string;
  profileImageUrl?: string;
  status:string;
  role: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String },
    role: { type: String, enum: ["user", "instructor"], default: "user" },
    status: {type:String, enum: ["active", "blocked"], default:"active"},
    title: { type: String },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", UserSchema);
