import { inject, injectable } from "inversify";
import { IWishlistService } from "../core/interfaces/service/IWishlistService";
import { IWishlist } from "../models/Wishlist";
import { TYPES } from "../di/types";
import { IWishlistRepository } from "../core/interfaces/repository/IWishlistRepository";
import mongoose from "mongoose";

@injectable()
export class WishlistService implements IWishlistService {
    constructor(@inject(TYPES.WishlistRepository) private wishlistRepository:IWishlistRepository){}
    async addToWishlist(userId: string, courseId: string): Promise<IWishlist | null> {
         const courseObjectId = new mongoose.Types.ObjectId(courseId);
        

        let wishlist = await this.wishlistRepository.findOne({userId})
        if(!wishlist)
            wishlist = await this.wishlistRepository.create({userId})

        if (wishlist?.courses.map(course => course.toString()).includes(courseObjectId.toString())) {
            throw new Error("This course is already in your wishlist");
        }

        return await this.wishlistRepository.addWishlistItem(userId,courseId)

    }
    async getWishlist(userId: string): Promise<IWishlist | null> {
        let wishlist = await this.wishlistRepository.getWishlistItems(userId)

        if(!wishlist)
            wishlist = await this.wishlistRepository.create({userId})

        return wishlist
    }
    async removeFromWishlist(userId: string, courseId: string): Promise<IWishlist | null> {
        return await this.wishlistRepository.removeWishlistItem(userId, courseId)
    }
}