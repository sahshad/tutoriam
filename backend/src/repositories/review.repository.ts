import { injectable } from "inversify";
import { IReview, Review } from "../models/Review";
import { IReviewRepository } from "../core/interfaces/repository/IReviewRepository";
import { Types } from "mongoose";
import { BaseRepository } from "../core/abstracts/base.repository";

@injectable()
export class ReviewRepository extends BaseRepository<IReview> implements IReviewRepository {
  constructor(){
    super(Review)
  }
   
    async createReview(data: Partial<IReview>): Promise<IReview> {
      return (await Review.create(data)).populate("userId")
    }
  
    async findReviewsByCourse(courseId: string, skip: number, limit: number, rating?: number, userReviewId?:string): Promise<IReview[]> {
      const filter: any = { courseId };
      if (rating) filter.rating = rating;
      if (userReviewId) {
        filter._id = { $ne: userReviewId };
      }
    
      return await Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit).populate("userId", "name profileImageUrl");
    }
  
    async findUserReview(courseId: string, userId: string): Promise<IReview | null> {
      return await Review.findOne({ courseId, userId }).populate("userId", "name profileImageUrl");
    }
  
    async updateReview(reviewId: string, data: Partial<IReview>): Promise<IReview | null> {
      return await Review.findByIdAndUpdate(reviewId, data, { new: true })
    }
  
    async deleteReview(reviewId: string): Promise<IReview | null> {
      return await Review.findByIdAndDelete(reviewId);
    }
  }