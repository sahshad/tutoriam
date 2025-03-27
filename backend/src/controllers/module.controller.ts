import { inject, injectable } from "inversify";
import { IModuleController } from "../core/interfaces/controller/IModuleController";

@injectable()
export class ModuleController implements IModuleController{
    constructor(@inject("ModuleService") private moduleService: IModuleController) {}
}