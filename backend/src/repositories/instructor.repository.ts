import mongoose, { FilterQuery, ObjectId, Types } from "mongoose";
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

 async getUserApplications(userId: string):Promise<IInstructor[] | null>{
    return await Instructor.find({userId: new Types.ObjectId(userId)}).populate("userId")
  }

  async findInstructorsByUserId(instructorIds: string[], skip:number, limit: number, searchQuery?: string): Promise<IInstructor[] | null> {
    // return await Instructor.find(filter).populate('userId').skip(skip).limit(limit)
    const pipeline: any[] = [
      {
        $match: {
          userId: { $in: instructorIds.map(id => new mongoose.Types.ObjectId(id)) },
          "adminApproval.status": "approved",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: "$userId",
      },
    ];

    if (searchQuery) {
      pipeline.push({
        $match: {
          "userId.name": { $regex: searchQuery, $options: "i" },
        },
      });
    }
  
    pipeline.push(
      { $skip: skip },
      { $limit: limit }
    );
  
    return await Instructor.aggregate(pipeline);
  }
}
