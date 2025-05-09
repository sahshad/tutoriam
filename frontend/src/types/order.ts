// export interface Course {
//     id: number
//     title: string
//     image: string
//     rating: number
//     reviews: number
//     instructor: string
//     price: number
//   }

import { Course } from "./course";
import { IUser } from "./user";

  
//   export interface PurchaseDetails {
//     date: string
//     courseCount: number
//     totalAmount: number
//     currency: string
//     paymentMethod: string
//     cardNumber: string
//     cardExpiry: string
//   }
  
//   export interface PurchaseGroup {
//     id: string
//     date: string
//     totalAmount: number
//     currency: string
//     paymentMethod: string
//     cardNumber: string
//     cardExpiry: string
//     courseCount: number
//     courses: Course[]
//   }
  
//   export interface PurchaseItem {
//     id: string
//     date: string
//     course: string
//     price: number
//     status: string
//   }
  

export interface IOrder {
    _id:string;
    userId: string | IUser;
    courseIds: Course[];
    totalAmount: number;
    paymentIntentId: string;
    status: 'Paid' | 'Failed';
    createdAt: Date;
    updatedAt: Date;
  }