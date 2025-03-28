import { inject, injectable } from "inversify";
import { IModuleController } from "../core/interfaces/controller/IModuleController";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { IModuleService } from "../core/interfaces/service/IModuleService";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";

@injectable()
export class ModuleController implements IModuleController{
    constructor(@inject(TYPES.ModuleService) private moduleService: IModuleService) {}

 createModule = asyncHandler(async (req:Request, res:Response) => {
    console.log(req.body)
    const data = req.body
    const module = await this.moduleService.createModule(data)
    res.status(StatusCodes.CREATED).json(module)
 })
}