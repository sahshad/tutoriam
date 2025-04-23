import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../core/constants/user.enum";
import container from "../di/container";
import { IModuleController } from "../core/interfaces/controller/IModuleController";
import { TYPES } from "../di/types";

const router = express.Router();

const moduleController = container.get<IModuleController>(TYPES.ModuleController);

router.post("/", authMiddleware([UserRole.INSTRUCTOR]), moduleController.createModule);
router.put("/:moduleId", authMiddleware([UserRole.INSTRUCTOR]), moduleController.updateModule);
router.delete("/:moduleId", authMiddleware([UserRole.INSTRUCTOR]), moduleController.deleteModule);

export default router;
