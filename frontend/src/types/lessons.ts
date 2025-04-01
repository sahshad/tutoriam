export interface Lesson {
    _id: string;
    moduleId: string;
    title: string;
    contentType: string;
    videoUrl?: string;
    order: number;
    attachments?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }
  