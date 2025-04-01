import apiClient from "@/utils/axiosInstance"
import axios, { AxiosResponse } from "axios"

export const getCourseById = async(courseId:string)=>{
  try {
    const res = await apiClient.get(`/instructor/courses/${courseId}`)
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
