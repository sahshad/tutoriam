import mongoose from "mongoose";
import { IEnrollmentRepository } from "../core/interfaces/repository/IEnrollmentRepository";
import Enrollment, { IEnrollment } from "../models/Enrollment";
import { injectable } from "inversify";
import { BaseRepository } from "../core/abstracts/base.repository";
import { IUser } from "../models/User";
import { EnrolledStudent } from "../core/types/userTypes";
import { HttpException } from "../core/exceptions/HttpException";

@injectable()
export class EnrollmentRepository extends BaseRepository<IEnrollment> implements IEnrollmentRepository {

  constructor(){
    super(Enrollment)
  }

  async getEnrollmentsWithPagination(filter: mongoose.FilterQuery<IEnrollment>, skip: number, limit: number): Promise<IEnrollment[]> {
      return await Enrollment.find(filter).skip(skip).limit(limit).populate("courseId")
  }

  async isUserEnrolled(userId:string, courseId:string): Promise<IEnrollment | null>{
    return await Enrollment.findOne({userId, courseId})
  }

  async createEnrollment(userId:string, courseId:string, totalLessons:number) {
    return Enrollment.create({
      userId,
      courseId,
      enrolledAt: new Date(),
      progress: {
        completedLessons: [],
        lastVisited: null,
        totalLessons,
        percentage: 0,
      },
      completed: false,
    });
  }


  async findEnrollmentsByUser(userId:string) {
    return Enrollment.find({ userId }).populate("courseId");
  }

  // async updateLessonCompletion(userId:string, courseId:string, lessonId:string) {
  //   const enrollment = await Enrollment.findOne({ userId, courseId });
  //   if (!enrollment) return null;

  //   if (!enrollment.progress.completedLessons.includes(new mongoose.Types.ObjectId(lessonId))) {
  //     enrollment.progress.completedLessons.push(new mongoose.Types.ObjectId(lessonId));
  //   }

  //   enrollment.progress.lastVisited = new mongoose.Types.ObjectId(lessonId);
  //   enrollment.progress.percentage = Math.floor(
  //     (enrollment.progress.completedLessons.length / enrollment.progress.totalLessons) * 100
  //   );
  //   enrollment.completed = enrollment.progress.percentage === 100;

  //   return enrollment.save();
  // }

  async updateLessonCompletion(userId: string, courseId: string, lessonId: string) {
    const enrollment = await Enrollment.findOne({ userId, courseId });
    if (!enrollment) return null;

    if(! enrollment.progress.visitedLessons.includes(lessonId)){
      throw new HttpException("cannot complete lesson before watch it",400)
    }
  
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
    const { completedLessons } = enrollment.progress;
  
    const isCompleted = completedLessons.some(id => id.equals(lessonObjectId));
  
    if (isCompleted) {
      enrollment.progress.completedLessons = completedLessons.filter(id => !id.equals(lessonObjectId));
    } else {
      enrollment.progress.completedLessons.push(lessonObjectId);
    }

    enrollment.progress.lastVisited = lessonObjectId;
  
    enrollment.progress.percentage = Math.floor(
      (enrollment.progress.completedLessons.length / enrollment.progress.totalLessons) * 100
    );
  
    enrollment.completed = enrollment.progress.percentage === 100;
  
    return enrollment.save();
  }

    async updateLastVisitedLesson(filter: mongoose.FilterQuery<IEnrollment>, lessonId: string): Promise<IEnrollment | null> {
     console.log(filter)
      return await Enrollment.findOneAndUpdate(filter, {
        $set: { 'progress.lastVisited': lessonId },
        $addToSet: { 'progress.visitedLessons': lessonId }
      }, {new: true})
    }

  async findDistinctInstructors(userId: string): Promise<string[]> {
    const objectId = new mongoose.Types.ObjectId(userId);
    const result = await Enrollment.aggregate([
      {
        $match: { userId: objectId }
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      {
        $unwind: "$course"
      },
      {
        $group: {
          _id: "$course.instructorId"
        }
      },
      {
        $project: {
          instructorId: "$_id",
          _id: 0
        }
      }
    ]);
  
    return result.map((r) => r.instructorId.toString());
  }

  async getEnrolledStudentsOfACourse(courseId: string):Promise<EnrolledStudent[] | null> {
    const enrollments = await Enrollment.find({ courseId })
    .populate<{ userId: Partial<IUser> }>("userId", "name profileImageUrl _id")
    .lean()
    .exec();

  return enrollments.map((enrollment) => {
    const user = enrollment.userId as Partial<IUser>;
    return {
      user: {
        _id: user?._id?.toString(),
        name: user?.name,
        profileImageUrl: user?.profileImageUrl,
      },
      enrollmentDate: enrollment.enrolledAt,
    };
  });
  }
}
