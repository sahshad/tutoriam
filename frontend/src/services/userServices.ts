import { updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import apiClient from "@/utils/axiosInstance";

export const updateProfile = async (
  formData: FormData,
  dispatch: AppDispatch
) => {
  const response = await apiClient.put(`/users/profile`, formData, {
    withCredentials: true,
  });
  dispatch(
    updateUser({
      user: response.data.user,
    })
  );
};

export const changePassword = async (
  currentPassword: string,
  newPassword: string
) => {
 try {
    const response = await apiClient.patch(
        `users/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      return response
 } catch (error:any) {
    return error.response
 }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get(
      `users/profile`,
      {withCredentials:true}
    )
    return response
  } catch (error:any) {
    return error.response

  }
}

export const sendInstructorApplication = async(formData:FormData) => {
  try {
  const response = apiClient.post(`users/become-instructor`,formData , {withCredentials:true} )
    return response
  } catch (error:any) {
    console.log(error)
    return error.response
  }
}

export const getApplications = async () => {
  try {
    const res = await apiClient.get("users/applications")
    return res.data
  } catch (error) {
    throw error
  }
}


export const getUsers = async () =>{
  const response = await apiClient.get(
      `/users`,
      {withCredentials:true}
  )
  return response
}

export const toggleUserStatus = async (userId:string) =>{
  try {
      const response = await apiClient.patch(
          `/users/${userId}/status`,
          {},
          {withCredentials:true}
      )
  
      return response
  } catch (error:any) {
      console.log(error)
      return error.response
  }
}

export const getUserDashboard = async () => {
  try {
    const res = await apiClient.get("/users/dashboard")
    return res.data
  } catch (error) {
    console.log(error)
  }
}