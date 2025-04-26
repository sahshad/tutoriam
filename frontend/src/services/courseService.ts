import { GetCoursesRequestParams, UserCourseFilterParams } from "@/types/course"
import apiClient from "@/lib/axios"
import axios, { AxiosResponse } from "axios"

export const getCourseById = async(courseId:string)=>{
  try {
    const res = await apiClient.get(`/courses/${courseId}`)
    return res
  } catch (error: any) {
    throw error
  }
}

export const getAllCourses = async({page,limit, searchQuery, category, subCategory, sortBy,level,priceMax,priceMin,duration}:UserCourseFilterParams) => {
    try {
       const res:AxiosResponse  =  await apiClient.get("/courses",{
        params: {
          page,
          limit,
          searchQuery,
          category,
          subCategory,
          sortBy,
          level,
          priceMax,
          priceMin,
          duration
        },
    })
       return res.data
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || error.message || "An unknown error occurred";
        } else {
            throw "An unexpected error occurred";
        }
    }
}

export const getMyCourses = async({page,limit, searchQuery, category, subCategory, sortBy}:GetCoursesRequestParams) => {
  console.log(page,limit, searchQuery, category, subCategory, sortBy)
  try {
    const response = await apiClient.get("/courses/my-courses", {
      params: {
        page,
        limit,
        searchQuery,
        category,
        subCategory,
        sortBy
      },
      withCredentials:true
    })
    return response.data
  } catch (error:any) {
    throw error
  }
}

export const updateCoursePublishStatus = async (courseId: string) => {
  try {
    return await apiClient.patch(`/courses/publish/${courseId}`)
  } catch (error) {
    throw error
  }
}

export const createCourse = async(data:any) => {
  try {
    const response = await apiClient.post("/courses", data, {withCredentials:true})
    return response
  } catch (error:any) {
    throw error
  }
}

export const updateCourse = async(courseId:string, data:any) => {
  try {
    const res = await apiClient.put(`/courses/${courseId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}