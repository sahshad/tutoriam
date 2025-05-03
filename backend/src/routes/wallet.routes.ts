import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../di/container";
import { TYPES } from "../di/types";
import { IWalletController } from "../core/interfaces/controller/IWalletController";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();
const walletController = container.get<IWalletController>(TYPES.WalletController);

router.get("/", authMiddleware([UserRole.INSTRUCTOR]), walletController.getWallet);

export default router;
