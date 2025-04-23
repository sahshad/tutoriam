import { ICertificate } from "../../../models/Certificate";

export interface ICertificateService {
    issueCertificate(userId: string, courseId: string): Promise<ICertificate>;
    getCertificateById(certificateId: string): Promise<ICertificate | null>;
  }