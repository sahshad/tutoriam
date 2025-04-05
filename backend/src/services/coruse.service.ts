import { inject, injectable } from "inversify";
import { BaseService } from "../core/abstracts/base.service";
import { ICourseService } from "../core/interfaces/service/ICourseService";
import { Course, ICourse } from "../models/Course";
import { TYPES } from "../di/types";
import { ICourseRepository } from "../core/interfaces/repository/ICourseRepository";
import { deleteImageFromCloudinary, deleteVideoFromCloudinary, uploadImageToCloudinary, uploadVideoToCloudinary } from "../utils/clodinaryServices";
import { PaginatedCoursesResponse } from "../core/types/userTypes";

@injectable()
export class CourseService extends BaseService<ICourse> implements ICourseService {
    constructor(@inject(TYPES.CourseRepository) private courseRepository: ICourseRepository) {
        super(courseRepository);
    }
  async createCourse(courseData: Partial<ICourse>, files:{ [fieldname: string]: Express.Multer.File[] }): Promise<ICourse | null> {

    if(!files)
        throw new Error("files must be provided for creating a course")

        const thumbnail = await uploadImageToCloudinary(files.thumbnail[0].buffer, 'course/thumbnail')
        const trailerData = await uploadVideoToCloudinary(files.trailer[0].buffer, 'course/trailer')

        courseData.thumbnail = thumbnail as string
        courseData.trailer = trailerData?.url as string
        
    return await this.courseRepository.create(courseData);
  }

 async getCoursesByInstructorId(instructorId: string): Promise<ICourse[] | null> {
     return await this.courseRepository.getCoursesByInstructorId(instructorId)
 }

async getMycourses({page=1, limit=12, search='', category='', subCategory='', sortBy='createdAt' }:
     { page: number; limit: number; search: string; category: string; subCategory: string; sortBy: string },
      instructorId:string): Promise<PaginatedCoursesResponse | null> {
    const skip = (page - 1) * limit
    const perPage = limit

    let filter:any = {};
    filter.instructorId = instructorId
    
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } }, 
            // { description: { $regex: search, $options: 'i' } } 
        ];
    }

    if(category){
        if(category === 'all'){
            filter.category = {$exists: true}
        }else{
        filter.category = category
        }
    }

    if(subCategory){
        if(subCategory === 'all'){
            filter.subCategory = {$exists: true}
        }
        else{
            filter.subCategory = subCategory
        }
    }

    let sort: any = {};
    switch (sortBy) {
      case 'price-high':
        sort.price = -1;  
        break;
      case 'price-low':
        sort.price = 1;  
        break;
      case 'latest':
        sort.createdAt = -1; 
        break;
      case 'oldest':
        sort.createdAt = 1; 
        break;
      case 'rating':
        sort.rating = -1;    
        break;
      default:
        sort.createdAt = -1; 
    }

     const courses = await this.courseRepository.getAllCourses(filter, skip, perPage, sort )
     const totalCourses = await this.courseRepository.getCoursescount(filter)

     return {
         totalCourses,
         totalPages: Math.ceil(totalCourses / perPage),
         currentPage: page,
         courses
       };
 }

 async updatePublishStatus(courseId: string): Promise<ICourse > {
     const course = await this.courseRepository.updateCoursePublishStatus(courseId)
     if(!course)
      throw new Error("cannot update course. please try agina")
    return course
 }

 async getAllCourses({page=1, limit=12, searchQuery='', sortBy='createdAt', subCategory = ['all'],  }): Promise<PaginatedCoursesResponse | null> {
    const skip = (page - 1) * limit
  const perPage = limit

  let filter:any = {};
  filter.isPublic = true
  if (searchQuery) {
    filter.$or = [
      { title: { $regex: searchQuery, $options: 'i' } }, 
    //   { description: { $regex: searchQuery, $options: 'i' } } 
    ];
  }

    if(subCategory.length > 0 && subCategory[0] !== 'all'){
        filter.subCategory = { $in: subCategory };
    }

  // Build sort
  const sort:any = {};
  switch(sortBy){
    case'price-desc' :
        sort.price = -1
        break
    case 'price-asc':
        sort.price = 1
        break   
    case 'trending':
        sort.enrollmentCount = -1
    case 'popular':
        sort.rating = -1    
        break
    case 'rating':
        sort.rating = -1    
        break
    case 'newest':
        sort.createdAt = -1 
        break
    default:
        sort.createdAt = -1        
  }

    const courses = await this.courseRepository.getAllCourses(filter, skip, perPage, sort )
    const totalCourses = await this.courseRepository.getCoursescount(filter)

    return {
        totalCourses,
        totalPages: Math.ceil(totalCourses / perPage),
        currentPage: page,
        courses
      };

 }

 async getFullCourse(courseId: string): Promise<ICourse | null> {
     const course = await this.courseRepository.getCourseWithModulesAndLessons(courseId)
     if(!course)
      throw new Error("cannot find course. please try again")

     return course
 }

 async updateCourse(courseId:string,data:Partial<ICourse> , files?:{ [fieldname: string]: Express.Multer.File[] }) : Promise<ICourse | null> {
    const existingCourse = await this.courseRepository.findById(courseId)

    if(!existingCourse){
        throw new Error("cannot find the course. please try again")
    }

    if (files?.thumbnail && files.thumbnail.length > 0) {
        await deleteImageFromCloudinary(existingCourse?.thumbnail as string)
        data.thumbnail = await uploadImageToCloudinary(files.thumbnail[0].buffer, 'course/thumbnail' ) as string
    }

    if(files?.trailer && files.trailer.length > 0){
        await deleteVideoFromCloudinary(existingCourse?.trailer as string)
        const trailerData = await uploadVideoToCloudinary(files.trailer[0].buffer, 'course/trailer') 
        data.trailer = trailerData?.url 
    }
    console.log(data)
    return  await this.courseRepository.findByIdAndUpdate(courseId,data )
 }
}
