import { RouteObject } from "react-router-dom";
import ProtectedRoute from "../components/user/auth/protected-routes";
import { UserRole } from "../lib/constants/role";
import InstructorDashboardPage from "../pages/instructor/InstructorDashboardPage";
import CreateCoursePage from "../pages/instructor/CreateCoursePage";
import CoursesPage from "../pages/instructor/Courses";
import SingleCoursePage from "../pages/instructor/CourseDetails";
import EditCoursePage from "../pages/instructor/EditCoursePage";

const instructorRoutes: RouteObject = {
  element: <ProtectedRoute role={[UserRole.INSTRUCTOR]} />,
  children: [
    { path: "/instructor/dashboard", element: <InstructorDashboardPage /> },
    { path: "/instructor/create-course", element: <CreateCoursePage /> },
    { path: "/instructor/my-courses", element: <CoursesPage /> },
    { path: "/instructor/my-courses/:courseId", element: <SingleCoursePage /> },
    { path: "/instructor/my-courses/:courseId/edit", element: <EditCoursePage /> },
  ],
};

export default instructorRoutes;
