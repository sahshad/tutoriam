import mongoose from "mongoose";
import { IEnrollmentRepository } from "../core/interfaces/repository/IEnrollmentRepository";
import Enrollment, { IEnrollment } from "../models/Enrollment";
import { injectable } from "inversify";
import { BaseRepository } from "../core/abstracts/base.repository";

@injectable()
export class EnrollmentRepository extends BaseRepository<IEnrollment> implements IEnrollmentRepository {

  constructor(){
    super(Enrollment)
  }

  async getEnrollmentsWithPagination(filter: mongoose.FilterQuery<IEnrollment>, skip: number, limit: number): Promise<IEnrollment[]> {
      return await Enrollment.find(filter).skip(skip).limit(limit).populate("courseId")
  }

  async isUserEnrolled(userId:string, courseId:string): Promise<boolean>{
    const enrollment = await Enrollment.findOne({userId, courseId})
    return enrollment ? true : false
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
  
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
    const { completedLessons } = enrollment.progress;
  
    const isCompleted = completedLessons.some(id => id.equals(lessonObjectId));
  
    if (isCompleted) {
      // Remove if it's already completed
      enrollment.progress.completedLessons = completedLessons.filter(id => !id.equals(lessonObjectId));
    } else {
      // Add if not completed
      enrollment.progress.completedLessons.push(lessonObjectId);
    }
  
    // Always update lastVisited to current lesson
    enrollment.progress.lastVisited = lessonObjectId;
  
    // Recalculate percentage
    enrollment.progress.percentage = Math.floor(
      (enrollment.progress.completedLessons.length / enrollment.progress.totalLessons) * 100
    );
  
    // Mark course as completed if percentage is 100
    enrollment.completed = enrollment.progress.percentage === 100;
  
    return enrollment.save();
  }

  async updateLastVisitedLesson(filter: mongoose.FilterQuery<IEnrollment>, lessonId: string): Promise<IEnrollment | null> {
     return await Enrollment.findOneAndUpdate(filter, { 'progress.lastVisited': lessonId }, {new: true})
  }
}
