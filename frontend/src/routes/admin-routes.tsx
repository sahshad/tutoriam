import DashboardLayout from "@/components/admin/layout/DashboardLayout";
import EarningsPage from "@/components/instructor/earnings/earnings-page";
import ProtectedRoute from "@/components/user/auth/protected-routes";
import { UserRole } from "@/lib/constants/role";
import CategoriesPage from "@/pages/admin/category-page";
import CoursesPage from "@/pages/admin/courses-page";
import DashboardPage from "@/pages/admin/DashboardPage";
import InstructorApplicationsPage from "@/pages/admin/InstructorApplications";
import OrdersPage from "@/pages/admin/orders-page";
import PayoutRequestsPage from "@/pages/admin/payout-requests- page";
import SettingsPage from "@/pages/admin/settings-page";
import TutorsPage from "@/pages/admin/TutorsPage";
import UsersPage from "@/pages/admin/UsersPage";
import { Navigate, Route } from "react-router-dom";

export const adminRoutes = (
  <Route element={<ProtectedRoute role={[UserRole.ADMIN]} />}>
    <Route path="/admin" element={<DashboardLayout />}>
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="users" element={<UsersPage />} />
      <Route path="tutors" element={<TutorsPage />} />
      <Route path="applications" element={<InstructorApplicationsPage />} />
      <Route path="categories" element={<CategoriesPage />} />
      <Route path="courses" element={<CoursesPage/>}/>
      <Route path="purchases" element={<OrdersPage/>}/>
      <Route path="payouts" element={<PayoutRequestsPage/>}/>
      <Route path="settings" element={<SettingsPage/>}/>
    </Route>
  </Route>
);
