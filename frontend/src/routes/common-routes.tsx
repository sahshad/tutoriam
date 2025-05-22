import ProtectedRoute from "@/components/user/auth/protected-routes";
import { UserRole } from "@/lib/constants/role";
import CartPage from "@/pages/user/CartPage";
import UserCoursesPage from "@/pages/user/CoursesPage";
import HomePage from "@/pages/user/HomePage";
import LoginPage from "@/pages/user/LoginPage";
import UserCourseDetailsPage from "@/pages/user/UserCourseDetails";
import WishlistPage from "@/pages/user/WishlistPage";
import AdminLoginPage from "../pages/admin/LoginPage";

import { Route } from "react-router-dom";
import AboutPage from "@/pages/user/about-page";
import ContactPage from "@/pages/user/contact-page";
export const commonRoutes = (
  <>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage/>}/>
    <Route path="/contact" element={<ContactPage/>}/>

    <Route element={<ProtectedRoute role={[UserRole.USER, UserRole.INSTRUCTOR]} />}>
      <Route path="/courses" element={<UserCoursesPage />} />
      <Route path="/courses/:courseId" element={<UserCourseDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
    </Route>
    <Route path="/admin/login" element={<AdminLoginPage />} />
  </>
);
