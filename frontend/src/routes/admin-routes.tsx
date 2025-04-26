import { RouteObject, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/user/auth/protected-routes";
import { UserRole } from "../lib/constants/role";
import DashboardLayout from "../components/admin/layout/DashboardLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import UsersPage from "../pages/admin/UsersPage";
import TutorsPage from "../pages/admin/TutorsPage";
import InstructorApplicationsPage from "../pages/admin/InstructorApplications";
import CategoriesPage from "../pages/admin/category-page";

const adminRoutes: RouteObject = {
  element: <ProtectedRoute role={[UserRole.ADMIN]} />,
  children: [
    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Navigate to="/admin/dashboard" replace /> },
        { path: "dashboard", element: <DashboardPage /> },
        { path: "users", element: <UsersPage /> },
        { path: "tutors", element: <TutorsPage /> },
        { path: "applications", element: <InstructorApplicationsPage /> },
        { path: "categories", element: <CategoriesPage /> },
      ],
    },
  ],
};

export default adminRoutes;
