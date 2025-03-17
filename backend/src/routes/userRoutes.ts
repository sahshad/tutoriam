import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";
import upload from "../middlewares/upload";

const router = express.Router();

router.use(authMiddleware);
router.get("/profile", UserController.getUserProfile)
router.put(
  "/profile",
  upload.single("profileImage"),
  UserController.updateProfile
);
router.patch("/:userId/change-password", UserController.changePassword)

export default router;
