import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ICertificateController } from "../core/interfaces/controller/ICertificateController";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { ICertificateService } from "../core/interfaces/service/ICertficateService";
import { StatusCodes } from "http-status-codes";

@injectable()
export class CertificateController implements ICertificateController {
  constructor(@inject(TYPES.CertificateService) private certificateService: ICertificateService) {}

  issueCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { courseId } = req.body;
    const userId = req.user?._id as string

    const certificate = await this.certificateService.issueCertificate(userId, courseId);
    res.status(StatusCodes.CREATED).json({ message: "certificate created successfully", certificateUrl: certificate.certificateUrl });
  });

  downloadCertificate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const certificateUrl = req.query.certificateUrl as string;
    if (!certificateUrl) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: "Certificate URL is required" });
        return
    }
    
    const response = await fetch(certificateUrl);
    console.log(response)
  
    if (!response.ok) {
       res.status(StatusCodes.BAD_GATEWAY).send("Could not fetch certificate from source");
       return
    }
  
    const buffer = await response.arrayBuffer();
  
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="certificate.pdf"');
  
    res.send(Buffer.from(buffer));
  })

  getCertificate = asyncHandler(async (req: Request, res: Response) => {
    const { certificateId } = req.params;
    const certificate = await this.certificateService.getCertificateById(certificateId);

    res.status(StatusCodes.OK).json({ message: "certificate fetched successfully", certificate });
  });
}
