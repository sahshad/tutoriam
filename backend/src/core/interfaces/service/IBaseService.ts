export interface IBaseService<T> {
    create(data: Partial<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    findByIdAndUpdate(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
    findAll(): Promise<T[] | null>;
    findOne(id: string): Promise<T | null>;
  }