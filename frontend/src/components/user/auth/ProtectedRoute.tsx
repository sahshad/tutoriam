import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
    
interface ProtectedRouteProps {
  role: "user" | "admin" | "instructor";
}

const ProtectedRoute = ({role}:ProtectedRouteProps) => {
  const user = useSelector((state: any) => state.auth.user);  
  const isAdmin = localStorage.getItem("adminLoggedIn")

  if(role === 'user' ){ 
    return user && !isAdmin && user.status === 'active' && user.role === 'user' ? <Outlet /> : <Navigate to="/login" replace />;
  }else if(role === 'instructor' ){
    return user && !isAdmin && user.status === 'active' && user?.role === 'instructor' ? <Outlet /> : <Navigate to="/login" replace />;
  }else if(role === 'admin'){
    return user && isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
  }
};

export default ProtectedRoute;