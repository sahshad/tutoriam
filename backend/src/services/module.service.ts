import { inject, injectable } from "inversify";
import { IModuleService } from "../core/interfaces/service/IModuleService";
import { TYPES } from "../di/types";
import { IModule } from "../models/Module";
import { IModuleRepository } from "../core/interfaces/repository/IModuleRepository";
import { BaseService } from "../core/abstracts/base.service";

@injectable()
export class ModuleService extends BaseService<IModule> implements IModuleService{
    constructor(@inject(TYPES.ModuleRepository) private moduleRepository: IModuleRepository) {
        super(moduleRepository);
    }

    async createModule(moduleData: any): Promise<IModule | null> {
       return await this.moduleRepository.addModule(moduleData)
    }
}