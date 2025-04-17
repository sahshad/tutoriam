import express from "express";
import container from "../di/container";
import { ICertificateController } from "../core/interfaces/controller/ICertificateController";
import { TYPES } from "../di/types";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserRole } from "../core/constants/user.enum";

const router = express.Router();

const certificateController = container.get<ICertificateController>(TYPES.CertificateController)

router.get("/download", authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]) ,certificateController.downloadCertificate)
router.post("/issue",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]) ,certificateController.issueCertificate);
router.get("/:certificateId",authMiddleware([UserRole.USER, UserRole.INSTRUCTOR]) ,certificateController.getCertificate);

export default router;
