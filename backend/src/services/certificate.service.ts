import { inject, injectable } from "inversify";
import { ICertificateService } from "../core/interfaces/service/ICertficateService";
import { ICertificate } from "../models/Certificate";
import { generateAndUploadCertificate } from "../utils/certificateService";
import { TYPES } from "../di/types";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { ICertificateRepository } from "../core/interfaces/repository/ICertificateRespository";

@injectable()
export class CertificateService implements ICertificateService {
    constructor(
        @inject(TYPES.CourseRepository) private courseRepository: ICourseRepository,
        @inject(TYPES.UserRepository) private userRespository: IUserRepository,
        @inject(TYPES.CertificateRepository) private certificateRepository: ICertificateRepository
      ) {}
  
    async issueCertificate(userId: string, courseId: string): Promise<ICertificate> {
      const existing = await this.certificateRepository.findByUserAndCourse(userId, courseId)
      if (existing) return existing;
      
      const course = await this.courseRepository.findById(courseId)
      const user = await this.userRespository.findById(userId)
      const certificateUrl = await generateAndUploadCertificate(user?.name as string, course?.title as string, 'course/certificates')
        if(!certificateUrl){
            throw new Error("Cannot create certificate. please try again")
        }
      const certificate = await this.certificateRepository.createCertificate({
        userId,
        courseId,
        certificateUrl,
        issuedAt: new Date(),
      });
  
      return certificate;
    }
  
    async getCertificateById(certificateId: string): Promise<ICertificate | null> {
      return await this.certificateRepository.findByCertificateId(certificateId);
    }
  }
  