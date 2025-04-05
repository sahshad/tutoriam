import apiClient from "@/utils/axiosInstance"
import axios, { AxiosResponse } from "axios";

export const getAdminDashboard = async () => {
    try {
        const res = await apiClient.get("/admin/dashboard")
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || error.message || "An unknown error occurred";
        } else {
            throw "An unexpected error occurred";
        }
    }
}

export const getUsers = async () =>{
    const response = await apiClient.get(
        `/admin/users`,
        {withCredentials:true}
    )
    return response
}

export const toggleUserStatus = async (userId:string) =>{
    try {
        const response = await apiClient.patch(
            `/admin/users/${userId}/status`,
            {},
            {withCredentials:true}
        )
    
        return response
    } catch (error:any) {
        console.log(error)
        return error.response
    }
}

export const fetchInstructorApplications = async () => {
    try {
        const response :AxiosResponse = await apiClient.get(`/admin/instructors/applications`, {withCredentials:true})
        return response
    } catch (error:any) {
        return error.response
    }
}


export const updateInstructorStatus = async (instructorId: string, status: "approved" | "rejected", reason?:string) => {
    try {
      const response = await apiClient.patch(
        `/admin/instructors/application/${instructorId}/status`,
        { status,reason},
        { withCredentials: true }
      );
  
      return response;
    } catch (error: any) {
      console.error("Error updating instructor status:", error);
      return error.response;
    }
  };
  