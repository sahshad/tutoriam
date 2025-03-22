import { Request, Response } from "express";

export interface IAdminController {
  getUsers(req: Request, res: Response): Promise<void>;
  toggleUserStatus(req: Request, res: Response): Promise<void>;
  reviewInstructor (req:Request, res:Response):Promise<void>
}
