import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { IReviewController } from "../core/interfaces/controller/IReviewController";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IReviewService } from "../core/interfaces/service/IReviewService";

@injectable()
export class ReviewController implements IReviewController {
  constructor(@inject(TYPES.ReviewService) private reviewService: IReviewService) {

  }

  addReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id
    const { courseId, rating, comment } = req.body;
    console.log(courseId)
    const review = await this.reviewService.addReview(userId as string,courseId as string, rating, comment);
    res.status(StatusCodes.CREATED).json({ message: "Review added", review });
  });

  getCourseReviews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string
    const {courseId} = req.params
    const { skip = "0", limit = "5", rating } = req.query;

    const parsedSkip = parseInt(skip as string);
    const parsedLimit = parseInt(limit as string);
    const parsedRating = rating && rating !== 'all' ? parseInt(rating as string) : undefined;

    const {reviews, hasMore} = await this.reviewService.getCourseReviews( userId, courseId,
      parsedSkip,
      parsedLimit,
      parsedRating);
    res.status(StatusCodes.OK).json({ message: "Reviews fetched success", reviews, hasMore });
  });

  updateReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?._id
    const {reviewId } = req.params
    const updated = await this.reviewService.updateUserReview(reviewId, userId as string, req.body);
    res.status(StatusCodes.OK).json({ message: "Review updated", updated });
  });

  deleteReview = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?._id as string
    const { reviewId }= req.params
    await this.reviewService.removeUserReview(reviewId, userId);
    res.status(StatusCodes.OK).json({ message: "Review deleted" });
  });
}
