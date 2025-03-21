import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IInstructorController } from "../core/interfaces/controller/IInstructorController";
import { TYPES } from "../di/types";
import { IInstructorService } from "../core/interfaces/service/IInstructorService";

@injectable()
export class InstructorController implements IInstructorController {
 
    constructor(@inject(TYPES.InstructorService) private instructorService:IInstructorService){}
    getInstructorApplications = async (req:Request, res:Response):Promise<void> => {
        try {
            const instructorApplications = await this.instructorService.getInstructorApplications()
            res.status(200).json({instructorApplications, message:"applications fetched successfully"})
        } catch (error:any) {
            res.status(400).json({message: error.message})
        }
    }

}