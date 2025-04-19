import apiClient from "@/utils/axiosInstance";

interface FetchEnrolledCoursesParams {
  page: number;
  limit: number;
  searchQuery?: string;
  sortBy?: string;
  filter?: string;
}

export const fetchEnrolledCourses = async (params: FetchEnrolledCoursesParams) => {
  try {
    const res = await apiClient.get("/user/enrolled/courses", {
      params: {
        page: params.page,
        limit: params.limit,
        search: params.searchQuery || "",
        filter: params.filter || "all",
      },
    });

    return res.data.enrollments;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error;
  }
};

export const fetchEnrolledCourseWithModulesAndLessons = async (courseId: string) => {
  try {
    const res = await apiClient.get(`/user/courses/watch/${courseId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLastVisitedLesson = async (courseId: string, lessonId: string) => {
  try {
    const res = await apiClient.patch("/user/courses/enrolled/update-lastvisit", { courseId, lessonId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const completeLesson = async (courseId: string, lessonId: string) => {
    try {
        const res = await apiClient.post("/user/courses/enrolled/complete-lesson", {courseId, lessonId})
        return res.data
    } catch (error) {
        console.log(error)
    }
};

export const fetchUserEnrollmentStatus = async (courseId: string) => {
  try {
    const res = await apiClient.get("/enrollment/status", {
      params:{
        courseId
      }
    })

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const enrollUserIntoCourse = async (courseId: string) => {
  try {
    const res = await apiClient.post("/enrollment", {courseId})
    return res.data
  } catch (error) {
    console.log(error)
  }
}
