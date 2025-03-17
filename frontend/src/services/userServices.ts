import { updateUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import api from "@/utils/axiosInstance";
// import axios from "axios"

const API_URL = "http://localhost:5000/api/user";

export const updateProfile = async (
  formData: FormData,
  dispatch: AppDispatch
) => {
  const response = await api.put(`${API_URL}/profile`, formData, {
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
    const response = await api.patch(
        `${API_URL}/${userId}/change-password`,
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
    const response = await api.get(
      `user/profile`,
      {withCredentials:true}
    )
    return response
  } catch (error:any) {
    console.log(error)
    return error.response

  }
}
