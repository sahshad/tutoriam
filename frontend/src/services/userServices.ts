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

export const addCourseToCart = async (courseId: string) => {
  try {
    const res = await apiClient.post("user/cart/add", {courseId})
    return res.data
  } catch (error:any) {
    throw error.response
  }
}

export const removeCourseFromCart = async( courseId: string) => {
  try {
    const res = await apiClient.post("user/cart/remove", {courseId})
    return res.data
  } catch (error) {
    throw error
  }
}

export const getCartItems = async () => {
  try {
    const res = await apiClient.get("user/cart")
    return res.data
  } catch (error) {
    throw error
  }
}
export const addCourseToWishlist = async (courseId: string) => {
  try {
    const res = await apiClient.post("user/wishlist/add", {courseId})
    return res.data
  } catch (error:any) {
    throw error.response
  }
}

export const removeCourseFromWishlist = async( courseId: string) => {
  try {
    const res = await apiClient.post("user/wishlist/remove", {courseId})
    return res.data
  } catch (error) {
    throw error
  }
}

export const getWishlistItems = async () => {
  try {
    const res = await apiClient.get("user/wishlist")
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getApplications = async () => {
  try {
    const res = await apiClient.get("user/applications")
    return res.data
  } catch (error) {
    throw error
  }
}
