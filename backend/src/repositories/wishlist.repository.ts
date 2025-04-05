import mongoose from "mongoose";
import { IWishlistRepository } from "../core/interfaces/repository/IWishlistRepository";
import { IWishlist, Wishlist } from "../models/Wishlist";
import { BaseRepository } from "../core/abstracts/base.repository";

export class WishlistRepository extends BaseRepository<IWishlist> implements IWishlistRepository{
    constructor(){
        super(Wishlist)
    }
    async addWishlistItem(userId: string, courseId: string): Promise<IWishlist | null> {
        const courseObjectId = new mongoose.Types.ObjectId(courseId);

        return await Wishlist.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(userId) },
            { $addToSet: { courses: courseObjectId } }, 
            { new: true, upsert: true } 
        );
    }

    // clearWishlist(userId: string): Promise<IWishlist | null> {
        
    // }

    async getWishlistItems(userId: string): Promise<IWishlist | null> {
        return await Wishlist.findOne({ userId: new mongoose.Types.ObjectId(userId) })
        .populate({
            path: 'courses', 
            populate: {
            path: 'instructorId', 
            model: 'User' 
            }
            });
    }

    async removeWishlistItem(userId: string, courseId: string): Promise<IWishlist | null> {
        const courseObjectId = new mongoose.Types.ObjectId(courseId);

        return await Wishlist.findOneAndUpdate(
            { userId: new mongoose.Types.ObjectId(userId) }, 
            { $pull: { courses: courseObjectId } }, 
            { new: true } 
        );
    }
}