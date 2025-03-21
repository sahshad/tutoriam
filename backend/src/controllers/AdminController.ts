import { Request, Response } from "express";
import { IAdminController } from "../core/interfaces/controller/IAdminController";
import { inject, injectable } from "inversify";
import { IAdminService } from "../core/interfaces/service/IAdminService";
import { TYPES } from "../di/types";

@injectable()
export class AdminController implements IAdminController {
  constructor(
    @inject(TYPES.AdminService) private adminService: IAdminService
  ) {}

   getUsers = async (req: Request, res: Response): Promise<void> =>{
    try {
      const users = await this.adminService.getUsers();
      if (!users) res.status(404).json({ message: "users not found" });
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ message: "server error" });
    }
  }

   toggleUserStatus= async (req: Request, res: Response): Promise<void> =>{
    try {
      const { userId } = req.params;
      const user = await this.adminService.toggleUserStatus(userId);
      res.status(200).json({ message: "user status changed successfully" });
    } catch (error: any) {
      console.log(error);
      res.status(500).json({ message: "user not found" });
    }
  }
}
