import express from "express";
import { AuthController } from "../controllers/AuthController";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/resend-otp", AuthController.resendOtp);
router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.post("/forgot-password", AuthController.forgotPassword)
router.post("/reset-password",AuthController.resetPassword)


export default router;
