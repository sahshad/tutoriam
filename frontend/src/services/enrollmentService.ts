import apiClient from "@/lib/axios";

interface FetchEnrolledCoursesParams {
  page: number;
  limit: number;
  searchQuery?: string;
  sortBy?: string;
  filter?: string;
}

export const fetchEnrolledCourses = async (params: FetchEnrolledCoursesParams) => {
  try {
    const res = await apiClient.get("/enrollments", {
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
    const res = await apiClient.get(`/enrollments/${courseId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateLastVisitedLesson = async (courseId: string, lessonId: string) => {
  try {
    const res = await apiClient.patch(`/enrollments/${courseId}/update-lastvisit`, { lessonId});
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const completeLesson = async (courseId: string, lessonId: string) => {
    try {
        const res = await apiClient.post(`/enrollments/${courseId}/complete-lesson`, { lessonId})
        return res.data
    } catch (error) {
        console.log(error)
    }
};

export const fetchUserEnrollmentStatus = async (courseId: string) => {
  try {
    const res = await apiClient.get(`/enrollments/${courseId}/status`)

    return res.data
  } catch (error) {
    console.log(error)
  }
}

export const enrollUserIntoCourse = async (courseId: string) => {
  try {
    const res = await apiClient.post("/enrollments", {courseId})
    return res.data
  } catch (error) {
    console.log(error)
  }
}
