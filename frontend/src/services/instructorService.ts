import { GetCoursesRequestParams } from "@/types/course"
import apiClient from "@/utils/axiosInstance"
import api from "@/utils/axiosInstance"

export const sendInstructorApplication = async() => {
    api.post('/instructor/apply')
}

export const createCourse = async(data:any) => {
  try {
    const response = await apiClient.post("/instructor/course", data, {withCredentials:true})
    return response
  } catch (error:any) {
    throw error
  }
}

export const updateCourse = async(courseId:string, data:any) => {
  try {
    const res = await apiClient.put(`/instructor/courses/${courseId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const createModule = async(data:any) => {
  try {
    const response = await apiClient.post("/instructor/module", data, {withCredentials:true})
    return response
  } catch (error:any) {
    throw error
  }
}

export const updateModule = async (moduleId:string, data: any) => {
  console.log(data)
  try {
    const res = await apiClient.put(`/instructor/modules/${moduleId}`, data)
    return res.data
  } catch (error) {
   throw error 
  }
}

export const deleteModule = async (moduleId:string) => {
  try {
    const res = await apiClient.delete(`/instructor/modules/${moduleId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const createLesson = async(data:any) => {
  try {
    return await apiClient.post("/instructor/lesson", data, {withCredentials: true})
  } catch (error:any) {
    throw error
  }
}

export const updateLesson = async (lessonId: string, data: any) => {
  try {
    const res = await apiClient.put(`/instructor/lessons/${lessonId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteLesson = async (lessonId: string) => {
  try {
    const res = await apiClient.delete(`/instructor/lessons/${lessonId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getMyCourses = async({page,limit, searchQuery, category, subCategory, sortBy}:GetCoursesRequestParams) => {
  console.log(page,limit, searchQuery, category, subCategory, sortBy)
  try {
    const response = await apiClient.get("/instructor/courses", {
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
  // try {
  //   return await apiClient.get(`/instructor/courses?${page}`,{withCredentials:true})
  // } catch (error:any) {
  //   throw error
  // }
}

export const updateCoursePublishStatus = async (courseId: string) => {
  try {
    return await apiClient.patch(`/instructor/courses/${courseId}`,{},{withCredentials:true})
  } catch (error) {
    throw error
  }
}