export interface IBaseRepository<T> {
    create(data: Partial<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findAll(): Promise<T[] | null>;
    findOne(data: Partial<T>): Promise<T | null>;
  }