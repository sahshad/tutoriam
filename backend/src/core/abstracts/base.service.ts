import { Document } from "mongoose";
import { IBaseRepository } from "../interfaces/repository/IBaseRepository";
import { IBaseService } from "../interfaces/service/IBaseService";

export abstract class BaseService<T extends Document> implements IBaseService<T> {
  constructor(protected repository: IBaseRepository<T>) {}

  async create(data: Partial<T>): Promise<T | null> {
    return await this.repository.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repository.update(id, data);
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    return await this.repository.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<T | null> {
    return await this.repository.delete(id);
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return await this.repository.delete(id)
  }

  async findAll(): Promise<T[] | null> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<T | null> {
    return await this.repository.findOne(id);
  }
}