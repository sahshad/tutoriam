import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/UserController";
import upload from "../middlewares/upload";

const router = express.Router();

const userController = new UserController()

router.use(authMiddleware);
router.get("/profile", userController.getUserProfile)
router.put(
  "/profile",
  upload.single("profileImage"),
  userController.updateProfile
);
router.patch("/:userId/change-password", userController.changePassword)

export default router;
