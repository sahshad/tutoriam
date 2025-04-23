import { RequestHandler } from "express";

export interface IInstructorController {
  getInstructorApplications: RequestHandler;
  getInstructorProfile: RequestHandler;
  getUserApplications: RequestHandler;
  reviewInstructor: RequestHandler;
}
