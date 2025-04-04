import apiClient from "@/utils/axiosInstance"
import axios, { AxiosResponse } from "axios"

export const getCourseById = async(courseId:string)=>{
  try {
    const res = await apiClient.get(`/user/courses/${courseId}`)
    return res
  } catch (error: any) {
    throw error
  }
}

export const getAllCourses = async() => {
    try {
       const res:AxiosResponse  =  await apiClient.get("/user/courses")
       return res.data
    } catch (error:unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || error.message || "An unknown error occurred";
        } else {
            throw "An unexpected error occurred";
        }
    }
}

export const getInstructorDetails = async (instructorId: string) => {
  try {
    const res:AxiosResponse = await apiClient.get(`/user/instructor-profile?id=${instructorId}`)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message || "An unknown error occurred";
  } else {
      throw "An unexpected error occurred";
  }
  }
}
