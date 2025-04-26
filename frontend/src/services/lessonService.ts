import apiClient from "@/lib/axios"

export const createLesson = async(data:any) => {
    try {
      return await apiClient.post("/lessons", data, {withCredentials: true})
    } catch (error:any) {
      throw error
    }
  }
  
  export const updateLesson = async (lessonId: string, data: any) => {
    try {
      const res = await apiClient.put(`/lessons/${lessonId}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }
  
  export const deleteLesson = async (lessonId: string) => {
    try {
      const res = await apiClient.delete(`/lessons/${lessonId}`)
      return res.data
    } catch (error) {
      throw error
    }
  }