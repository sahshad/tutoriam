import { Request } from "express";

export interface Request extends Request {
  user?: {
    id: string;
  },
  file?:Express.Multer.file
}