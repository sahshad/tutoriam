import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";

export interface ICart extends Document {
  userId: mongoose.Schema.Types.ObjectId | string;
  courses: ObjectId[];
  createdAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
    courses: [{ type: Types.ObjectId, ref: "Course", default: [] }],
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
