import mongoose, { ObjectId, Types } from "mongoose";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { IInstructor, Instructor } from "../models/Instructor";
import { BaseRepository } from "../core/abstracts/base.repository";


export class InstructorRepository extends BaseRepository<IInstructor> implements IInstructorRepository {
constructor() {
    super(Instructor);
}

  createInstructor = async (instructor: any): Promise<IInstructor | null> => {
    instructor.userId = new mongoose.Types.ObjectId(
      instructor.userId as string
    );

    return await Instructor.create(instructor);
  };

  getInstructorApplications = async (): Promise<IInstructor[] | null> => {
    return await Instructor.find({
      "adminApproval.status": "pending",
    }).populate("userId");
  };

  updateInstructorStatus = async (
    id: string,
    updates: Partial<IInstructor>
  ): Promise<IInstructor | null> => {
    return await Instructor.findByIdAndUpdate(id, updates, { new: true });
  };

  getInstructors = async ():Promise<IInstructor[]  | null> => {
    return await Instructor.find({"adminApproval.status": "approved"}).populate("userId")
  }

  findInstructorByUserId(userId: string): Promise<IInstructor | null> {
    return Instructor.findOne({ userId: new Types.ObjectId(userId) })
  }

 async getInstructorProfile(instructorId:string):Promise<IInstructor | null>{
    return await Instructor.findOne({userId:instructorId}).populate("userId")
  
 }

}
