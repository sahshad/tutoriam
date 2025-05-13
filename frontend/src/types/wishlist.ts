import { Course } from "./course";

export interface IWishlist {
    userId:  string;
    courses: Course[];
  }

export interface WishlistItems {
    itmes: Course
}