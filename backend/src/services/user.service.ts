import { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/user.repository";
import { IUserService } from "../core/interfaces/service/IUserService";
import { inject, injectable } from "inversify";
import { TYPES } from "../di/types";
import { IUserRepository } from "../core/interfaces/repository/IUserRepository";
import { IInstructor } from "../models/Instructor";
import { IInstructorRepository } from "../core/interfaces/repository/IInstructorRepository";
import { BaseService } from "../core/abstracts/base.service";
import { DashboardData } from "../core/types/userTypes";
import { IEnrollmentRepository } from "../core/interfaces/repository/IEnrollmentRepository";

@injectable()
export class UserService extends BaseService<IUser> implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.InstructorRepository) private instructorRepository: IInstructorRepository,
    @inject(TYPES.EnrollmentRepository) private enrollmentRepository: IEnrollmentRepository
  ) {
    super(userRepository);
  }
  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser> {
    try {
      const user = await this.userRepository.updateById(userId, updateData);
      if (!user) {
        throw new Error("cannot update user. please try again");
      }
      return user;
    } catch (error) {
      throw new Error("error while updating user");
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<IUser> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) throw new Error("invalid userId");

      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) throw new Error("incorrect current password");

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const updatedUser = await this.userRepository.updateById(userId, { password: hashedPassword });
      if (!updatedUser) {
        throw new Error("cannot changed password. please try again");
      }
      return updatedUser;
    } catch (error) {
      throw new Error("incorrect given password");
    }
  }

  async getUserProfile(userId: string): Promise<IUser> {
    try {
      const user = await this.userRepository.findUserById(userId);
      if (!user) {
        throw new Error("invalid userId");
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("error while fetching user");
    }
  }

  async becomeInstructor(instructorData: Partial<IInstructor>): Promise<IInstructor | null> {
    const instructorExists = await this.instructorRepository.findInstructorByUserId(instructorData.userId as string);
    //@ts-ignore
    if (instructorExists?.adminApproval.status === "pending") throw new Error("your application is already in pending");
    const instructor = await this.instructorRepository.createInstructor(instructorData);
    if (!instructor) throw new Error("cannot apply to become an instructor. please try again");

    return instructor;
  }

  async findUserByGoogleId(googleId: string): Promise<IUser | null> {
    return await this.userRepository.findUserByGoogleId(googleId);
  }

  async createGoogleUser(
    name: string,
    email: string,
    profileImageUrl: string,
    googleId: string
  ): Promise<IUser | null> {
    const password = await bcrypt.hash(Math.random().toString(36).substring(2, 10), 10);
    const user = this.userRepository.create({ name, email, profileImageUrl, googleId, password });
    if (!user) {
      throw new Error("cannot create user please try again");
    }
    return user;
  }

  async getDashboardData(userId: string): Promise<DashboardData> {
    const enrollments = await this.enrollmentRepository.findEnrollmentsByUser(userId) ?? []
    const instructors = (await this.enrollmentRepository.findDistinctInstructors(userId)).length
    const enrolledCourses = enrollments?.length ?? 0
    const coursesInProgress = enrollments?.filter(enroll => !enroll.completed)
    const activeCourses = coursesInProgress?.length ?? 0
    const completedCourses = enrollments?.filter(enroll => enroll.completed).length ?? 0

    return {
      enrolledCourses,
      activeCourses,
      completedCourses,
      instructors,
      enrollments: coursesInProgress?.slice(0,4)
    }
    
  }
}
