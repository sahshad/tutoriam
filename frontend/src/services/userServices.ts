import { updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import apiClient from "@/utils/axiosInstance";


export const updateProfile = async (
  formData: FormData,
  dispatch: AppDispatch
) => {
  const response = await apiClient.put(`/user/profile`, formData, {
    withCredentials: true,
  });
  dispatch(
    updateUser({
      user: response.data.user,
    })
  );
};

export const changePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
 try {
    const response = await apiClient.patch(
        `user/${userId}/change-password`,
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
      `user/profile`,
      {withCredentials:true}
    )
    return response
  } catch (error:any) {
    return error.response

  }
}

export const sendInstructorApplication = async(userId:string,formData:FormData) => {
  try {
  const response = apiClient.post(`user/${userId}/become-instructor`,formData , {withCredentials:true} )
    return response
  } catch (error:any) {
    console.log(error)
    return error.response
  }
}
