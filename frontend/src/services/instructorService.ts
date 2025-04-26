import apiClient from "@/lib/axios"
import axios, { AxiosResponse } from "axios"

export const getInstructorDetails = async (userId: string) => {
  try {
    const res:AxiosResponse = await apiClient.get(`/instructors/${userId}/profile`)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data?.message || error.message || "An unknown error occurred";
  } else {
      throw "An unexpected error occurred";
  }
  }
}

export const fetchInstructorApplications = async () => {
    try {
        const response :AxiosResponse = await apiClient.get(`/instructors/applications`)
        return response
    } catch (error:any) {
        return error.response
    }
}

export const updateInstructorStatus = async (instructorId: string, status: "approved" | "rejected", reason?:string) => {
    try {
      const response = await apiClient.patch(
        `/instructors/applications/${instructorId}/status`,
        { status,reason},
        { withCredentials: true }
      );
      return response;
    } catch (error: any) {
      console.error("Error updating instructor status:", error);
      return error.response;
    }
  };
