import { Request, RequestHandler, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ICartController } from "../core/interfaces/controller/ICartController";
import asyncHandler from "express-async-handler";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { ICartService } from "../core/interfaces/service/ICartService";
import { use } from "passport";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CartController implements ICartController {
    constructor(@inject(TYPES.CartService) private cartService:ICartService){}
addItemToCart = asyncHandler(async (req: Request, res:Response) => {
    const {courseId } = req.body
    const userId = req.user?._id
    console.log(courseId)

    const cart = await this.cartService.addItemToCart(userId as string, courseId)
    res.status(StatusCodes.OK).json({message: "course added to cart successfully", cart})
    
})
clearCart = asyncHandler(async (req: Request, res:Response) => {

})
getCart = asyncHandler(async (req: Request, res:Response) => {
    const userId = req.user?._id
    const cart = await this.cartService.getCartItems(userId as string)
    console.log(cart)
    res.status(StatusCodes.OK).json({message:"cart fetched successfully", cart})
})
removeItemFromCart = asyncHandler(async (req: Request, res:Response) => {
  const {courseId} = req.body
  const userId = req.user?._id

  const cart = await this.cartService.removeItemFromCart(userId as string, courseId)
  res.status(StatusCodes.OK).json({message:"course remove from cart successfully", cart})
})
}