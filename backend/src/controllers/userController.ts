import { Request, Response } from "express";
import { AuthRequest } from "../types/custom";
import cloudinary, { uploadToCloudinary } from "../config/cloudinary";
import { UserService } from "../services/userService";
import { error } from "console";
import { IUserController } from "../core/interfaces/controller/IUserController";

const userService = new UserService();

export class UserController implements IUserController{
   async updateProfile(req: AuthRequest, res: Response):Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { name, title } = req.body;
      if (req.file) {
        const result = cloudinary.uploader
          .upload_stream({ folder: "profile_image" }, async (error, result) => {
            if (error) res.status(500).json({ error: error.message });
            if (result) {
              const updateData = {
                profileImageUrl: result.secure_url,
                name,
                title,
              };
              const response = await userService.updateUser(userId, updateData);
              res
                .status(200)
                .json({ message: "user updated successfully", user: response });
            }
          })
          .end(req.file.buffer);
      } else {
        const updateData = {
          name,
          title,
        };
        const response = await userService.updateUser(userId, updateData);
        res
          .status(200)
          .json({ message: "user updated successfully", user: response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }

   async changePassword(req: Request, res: Response):Promise<void>  {
    try {
      const { currentPassword, newPassword } = req.body;
      const { userId } = req.params;
      const updatedUser = await userService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      console.log(updatedUser);
      if (!updatedUser || updatedUser instanceof Error) {
        res.status(400).json({
          message: "please check the given passwords",
        });
        return;
      }

      res.status(200).json({ message: "password changed successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "an unexpted error occurred please try again" });
    }
  }

   async getUserProfile(req: AuthRequest, res: Response):Promise<void>  {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const user = await userService.getUserProfile(userId)

      if(user.status === 'blocked'){
        res.status(403).json({message: "you have been blocked"})
        return
      }

      res.status(200).json({user})
      
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "an unexpted error occurred please try again" });
    }
  }
}
