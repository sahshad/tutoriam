import { Request, RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IWishlistController } from "../core/interfaces/controller/IWishlistController";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IWishlistService } from "../core/interfaces/service/IWishlistService";
import { StatusCodes } from "http-status-codes";

@injectable()
export class WishlistController implements IWishlistController{
    constructor(@inject(TYPES.WishlistService) private wishlistService:IWishlistService){}
    addItemToWishlist = asyncHandler(async (req:Request, res:Response) => {
        const {courseId} = req.body
        const userId = req.user?._id

        const wishlist = await this.wishlistService.addToWishlist(userId as string, courseId)
        res.status(StatusCodes.OK).json({message:"course added to wishlist", wishlist})
    })
    // clearWishlist = asyncHandler(async (req:Request, res:Response) => {

    // })
    getWishlistItems = asyncHandler(async (req:Request, res:Response) => {
        const userId = req.user?._id

        const wishlist = await this.wishlistService.getWishlist(userId as string)
        res.status(StatusCodes.OK).json({message:"wishlist fetched successfully", wishlist})
    })
    removeItemFromWishlist = asyncHandler(async (req:Request, res:Response) => {
        const {courseId} = req.body
        const userId = req.user?._id

        const wishlist = await this.wishlistService.removeFromWishlist(userId as string, courseId)
        res.status(StatusCodes.OK).json({message:"course removed from wishlist", wishlist})
    })
}