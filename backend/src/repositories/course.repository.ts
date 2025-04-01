import mongoose from "mongoose";
import { BaseRepository } from "../core/abstracts/base.repository";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import { Course, ICourse } from "../models/Course";

export class CourseRepository extends BaseRepository<ICourse> implements ICourseRepository {
  constructor() {
    super(Course);
  }

  async getCoursesByInstructorId(instructorId: string): Promise<ICourse[] | null> {
    return await Course.find({ instructorId });
  }

  async updateCoursePublishStatus(courseId: string): Promise<ICourse | null> {
      return await Course.findByIdAndUpdate(courseId,  [
        {
          $set: {
            isPublic: {
              $cond: { if: { $eq: ["$isPublic", true] }, then: false, else: true }
            }
          }
        }
      ], {new:true})
  }

  async getAllCourses(): Promise<ICourse[] | null> {
      return await Course.find({isPublic:true})
  }

  async getCourseWithModulesAndLessons(courseId: string): Promise<ICourse | null> {
    const result = await Course.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(courseId) } },

      {
        $lookup: {
          from: "modules",
          localField: "_id",
          foreignField: "courseId",
          as: "modules",
        },
      },

      {
        $unwind: {
          path: "$modules",
          preserveNullAndEmptyArrays: true,
        },
      },

      {
        $lookup: {
          from: "lessons",
          localField: "modules._id",
          foreignField: "moduleId",
          as: "modules.lessons",
        },
      },

      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          subtitle: { $first: "$subtitle" },
          category: { $first: "$category" },
          subCategory: { $first: "$subCategory" },
          language: { $first: "$language" },
          level: { $first: "$level" },
          duration: { $first: "$duration" },
          thumbnail: { $first: "$thumbnail" },
          trailer: { $first: "$trailer" },
          description: { $first: "$description" },
          whatYouWillLearn: { $first: "$whatYouWillLearn" },
          welcomeMessage: { $first: "$welcomeMessage" },
          congratulationsMessage: { $first: "$congratulationsMessage" },
          instructorId: { $first: "$instructorId" },
          price: { $first: "$price" },
          discountPrice: { $first: "$discountPrice" },
          rating: { $first: "$rating" },
          enrollmentCount: { $first: "$enrollmentCount" },
          isFree: { $first: "$isFree" },
          isPublic: { $first: "$isPublic" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          modules: { $push: "$modules" },
        },
      },
    ]);

    return result.length > 0 ? result[0] : null;
  }
}
