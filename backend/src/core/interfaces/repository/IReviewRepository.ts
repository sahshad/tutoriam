import { Types } from "mongoose";
import { IReview } from "../../../models/Review";
import { IBaseRepository } from "./IBaseRepository";

export interface IReviewRepository extends IBaseRepository<IReview> {
    createReview(data: Partial<IReview>): Promise<IReview>;
    findReviewsByCourse(
      courseId: string,
      skip: number,
      limit: number,
      rating?: number,
      userReviewId?: string
    ): Promise<IReview[]>;
    findUserReview(courseId: string, userId: string): Promise<IReview | null>;
    updateReview(reviewId: string, data: Partial<IReview>): Promise<IReview | null>;
    deleteReview(reviewId: string): Promise<IReview | null>;
  }