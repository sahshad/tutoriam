import { ICertificate } from "../../../models/Certificate";

export interface ICertificateRepository {
    findByUserAndCourse(userId: string, courseId: string): Promise<ICertificate | null>;
    createCertificate(data: Partial<ICertificate>): Promise<ICertificate>;
    findByCertificateId(certificateId: string): Promise<ICertificate | null>;
  }