import { IUser } from "./user";

export interface IInstructor extends Document {
    _id:string;
    userId:  string | IUser;
    courses: string[];
    idCardImageUrl: string;
    education: {
      highestDegree: string;
      institution: string;
      graduationYear: string;
      fieldOfStudy: string;
    };
    experience: string;
    currentOccupation: string;
    skills: string[];
    preferredSubjects: string[];
    teachingLanguages: string[];
    bio: string;
    socialLinks: {
      linkedin: { type: String };
      github: { type: String };
      portfolio: { type: String };
    };
    adminApproval: {
      status: {
        type: String;
        enum: ["pending", "approved", "rejected"];
        default: "pending";
      };
      reason: { type: String };
    };
    createdAt: Date;
    updatedAt: Date;
  }

  export interface InstructorBasicDetails  {
    _id:string
    name: string;
    email: string;
    password: string;
    phoneNo?:string;
    profileImageUrl?: string;
    googleId?:string
    status:string;
    role: string;
    title?: string;
    totalStudents:number;
    createdAt: Date;
    updatedAt: Date;
  }