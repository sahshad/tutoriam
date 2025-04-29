import ProtectedRoute from "@/components/user/auth/protected-routes";
import { UserRole } from "@/lib/constants/role";
import SingleCoursePage from "@/pages/instructor/CourseDetails";
import CoursesPage from "@/pages/instructor/Courses";
import CreateCoursePage from "@/pages/instructor/CreateCoursePage";
import EditCoursePage from "@/pages/instructor/EditCoursePage";
import InstructorDashboardPage from "@/pages/instructor/InstructorDashboardPage";
import InstructorMessagesPage from "@/pages/instructor/messages-page";
import { Route } from "react-router-dom";

export const instructorRoutes = (
  <Route element={<ProtectedRoute role={[UserRole.INSTRUCTOR]} />}>
    <Route path="/instructor/dashboard" element={<InstructorDashboardPage />} />
    <Route path="/instructor/create-course" element={<CreateCoursePage />} />
    <Route path="/instructor/my-courses" element={<CoursesPage />} />
    <Route path="/instructor/messages" element={<InstructorMessagesPage />} />
    <Route path="/instructor/my-courses/:courseId" element={<SingleCoursePage />} />
    <Route path="/instructor/my-courses/:courseId/edit" element={<EditCoursePage />} />
  </Route>
);
