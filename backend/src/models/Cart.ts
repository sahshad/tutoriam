import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface ICart extends Document {
  userId: ObjectId;
  courses: ObjectId[];
  createdAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
