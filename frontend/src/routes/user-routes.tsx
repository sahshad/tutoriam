import PaymentFailed from "@/components/common/payment-failed";
import PaymentSuccess from "@/components/common/payment-success";
import ProtectedRoute from "@/components/user/auth/protected-routes";
import TutorApplicationForm from "@/components/user/become-instructor/instructor-application";
import WatchCoursePage from "@/components/user/watch-course/watch-course-page";
import { UserRole } from "@/lib/constants/role";
import BecomeInstructorPage from "@/pages/user/BecomeInstructorPage";
import UserProfile from "@/pages/user/UserProfile";
import { Navigate, Route } from "react-router-dom";
import UserDashboard from "../components/user/dashboard/dashboard-page";
import UserCourses from "../components/user/enrolled-course/enrolled-courses-page";
import MessagingPage from "@/components/user/messaging/message-page";
import PurchaseHistoryContent from "@/components/user/purchase-history/purchase-history-content";
import AccountSettings from "@/components/user/profile/account-settings";

export const userRoutes = (
  <Route element={<ProtectedRoute role={[UserRole.USER]} />}>
  <Route path="/profile" element={<UserProfile />} />
  <Route path="/be-instructor" element={<BecomeInstructorPage />} />
  <Route path="/be-instructor/apply" element={<TutorApplicationForm />} />
  <Route path="/courses/watch/:courseId" element={<WatchCoursePage />} />
  <Route path="/payment-success" element={<PaymentSuccess />} />
  <Route path="/payment-cancel" element={<PaymentFailed />} />

  <Route path="/user" element={<UserProfile />}>
    <Route index element={<Navigate to="dashboard" />} />
    <Route path="dashboard" element={<UserDashboard />} />
    <Route path="courses" element={<UserCourses />} />
    <Route path="message" element={<MessagingPage />} />
    <Route path="purchase-history" element={<PurchaseHistoryContent />} />
    <Route path="settings" element={<AccountSettings />} />
  </Route>
</Route>
)