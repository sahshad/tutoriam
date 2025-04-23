import apiClient from "@/utils/axiosInstance";

export const getWishlistItems = async () => {
  try {
    const res = await apiClient.get("/wishlists");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCourseToWishlist = async (courseId: string) => {
  try {
    const res = await apiClient.post("/wishlists/add", { courseId });
    return res.data;
  } catch (error: any) {
    throw error.response;
  }
};

export const removeCourseFromWishlist = async (courseId: string) => {
  try {
    const res = await apiClient.post("/wishlists/remove", { courseId });
    return res.data;
  } catch (error) {
    throw error;
  }
};
