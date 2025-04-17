import { injectable } from "inversify";
import { ICertificateRepository } from "../core/interfaces/repository/ICertificateRespository";
import { Certificate, ICertificate } from "../models/Certificate";

@injectable()
export class CertificateRepository implements ICertificateRepository {
    async findByUserAndCourse(userId: string, courseId: string): Promise<ICertificate | null> {
      return await Certificate.findOne({ userId, courseId });
    }
  
    async createCertificate(data: Partial<ICertificate>): Promise<ICertificate> {
      return await Certificate.create(data);
    }
  
    async findByCertificateId(certificateId: string): Promise<ICertificate | null> {
      return await Certificate.findOne({ certificateId });
    }
  }
  