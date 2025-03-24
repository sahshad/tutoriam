import { Document, Model } from "mongoose";
import { IBaseRepository } from "../interfaces/repository/IBaseRepository";

export abstract class BaseRepository<T extends Document>
  implements IBaseRepository<T>
{
  constructor(protected model: Model<T>) {}

  async create(data: Partial<T>): Promise<T | null> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, {
      upsert: true,
      new: true,
    });
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id)
  }

  async findByIdAndDelete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async findAll(): Promise<T[] | null> {
    return await this.model.find();
  }

  async findOne(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }
}
