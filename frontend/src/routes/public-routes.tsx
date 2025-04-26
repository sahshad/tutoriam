import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/user/LoginPage";
import AdminLoginPage from "../pages/admin/LoginPage";
import OtpPage from "../pages/user/OtpPage";
import HomePage from "../pages/user/HomePage";
import ForgotPasswordPage from "../pages/user/ForgotPasswordPage";
import ResetPasswordPage from "../pages/user/ResetPasswordPage";
import PaymentSuccess from "../components/common/payment-success";
import PaymentFailed from "../components/common/payment-failed";

const publicRoutes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/verify-otp", element: <OtpPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/payment-success", element: <PaymentSuccess /> },
  { path: "/payment-cancel", element: <PaymentFailed /> },
  { path: "/admin/login", element: <AdminLoginPage /> },
];

export default publicRoutes;
