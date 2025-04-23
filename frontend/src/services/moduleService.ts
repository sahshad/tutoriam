import apiClient from "@/utils/axiosInstance"

export const createModule = async(data:any) => {
    try {
      const response = await apiClient.post("/modules", data, {withCredentials:true})
      return response
    } catch (error:any) {
      throw error
    }
  }
  
  export const updateModule = async (moduleId:string, data: any) => {
    try {
      const res = await apiClient.put(`/modules/${moduleId}`, data)
      return res.data
    } catch (error) {
     throw error 
    }
  }
  
  export const deleteModule = async (moduleId:string) => {
    try {
      const res = await apiClient.delete(`/modules/${moduleId}`)
      console.log(res.data)
      return res.data
    } catch (error) {
      throw error
    }
  }