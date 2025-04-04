import { inject, injectable } from "inversify";
import { IModuleController } from "../core/interfaces/controller/IModuleController";
import asyncHandler from "express-async-handler";
import { Request, RequestHandler, Response } from "express";
import { IModuleService } from "../core/interfaces/service/IModuleService";
import { StatusCodes } from "http-status-codes";
import { TYPES } from "../di/types";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@injectable()
export class ModuleController implements IModuleController{
    constructor(@inject(TYPES.ModuleService) private moduleService: IModuleService) {}

 createModule = asyncHandler(async (req:Request, res:Response) => {
    console.log(req.body)
    const data = req.body
    const module = await this.moduleService.createModule(data)
    res.status(StatusCodes.CREATED).json(module)
 })

 updateModule = asyncHandler(async (req:Request, res:Response) => {
    const {moduleId} = req.params
    const data = req.body
    
    const module = await this.moduleService.update(moduleId, data)
    res.status(StatusCodes.OK).json({message: "module updated successfully", module})
 })

deleteModule = asyncHandler(async (req:Request, res:Response) => {
    const {mdouleId} = req.params 
    const module = this.moduleService.delete(mdouleId)

    res.status(StatusCodes.OK).json({message: "module deleted successfully"})
})

}