import { Request, RequestHandler, Response } from "express";

export interface IAdminController {
  getUsers:RequestHandler
  toggleUserStatus:RequestHandler
  reviewInstructor:RequestHandler
  getInstructors:RequestHandler
  getDashboard:RequestHandler
}
