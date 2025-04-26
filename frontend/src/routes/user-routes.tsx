import PaymentFailed from "@/components/common/payment-failed";
import PaymentSuccess from "@/components/common/payment-success";
import ProtectedRoute from "@/components/user/auth/protected-routes";
import TutorApplicationForm from "@/components/user/become-instructor/instructor-application";
import WatchCoursePage from "@/components/user/watch-course/watch-course-page";
import { UserRole } from "@/lib/constants/role";
import BecomeInstructorPage from "@/pages/user/BecomeInstructorPage";
import MessagePage from "@/pages/user/messaging-page";
import UserProfile from "@/pages/user/UserProfile";
import { RouteObject } from "react-router-dom";

const userRoutes: RouteObject = {
  element: <ProtectedRoute role={[UserRole.USER]} />,
  children: [
    { path: "/profile", element: <UserProfile /> },
    { path: "/become-instructor", element: <BecomeInstructorPage /> },
    { path: "/become-instructor/application", element: <TutorApplicationForm /> },
    { path: "/enrolled-courses/watch/:courseId", element: <WatchCoursePage /> },
    { path: "/payment-success", element: <PaymentSuccess /> },
    { path: "/payment-cancel", element: <PaymentFailed /> },
    { path: "/message", element: <MessagePage /> },
  ],
};

export default userRoutes