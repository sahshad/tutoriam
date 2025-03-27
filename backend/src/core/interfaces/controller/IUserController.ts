import { Request, RequestHandler, Response } from "express"
import { Request } from "../../../types/custom"

export interface IUserController {
    updateProfile:RequestHandler
    changePassword:RequestHandler
    getUserProfile:RequestHandler
    becomeInstructor:RequestHandler
}