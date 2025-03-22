import { Request, Response } from "express";

export interface IInstructorController {
    getInstructorApplications(req:Request, res:Response):Promise<void>
}