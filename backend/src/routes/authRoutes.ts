import express, { Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import container from "../di/container";
import { IAuthController } from "../core/interfaces/controller/IAuthController";
import { TYPES } from "../di/types";
import passport from "passport";

const router = express.Router();

const authController = container.get<IAuthController>(TYPES.AuthController)

router.post("/register", authController.register);
router.post("/verify-otp", authController.verifyOtp);
router.post("/resend-otp", authController.resendOtp);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password",authController.resetPassword)

router.get("/google", passport.authenticate('google',{scope:["email", "profile"], prompt: "select_account"}))

router.get("/google/callback",
    passport.authenticate("google", {
        failureRedirect:`${process.env.CLIENT_URL}/login`,
        session:false
    }),
    authController.googleAuth
)


export default router;
