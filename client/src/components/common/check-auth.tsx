import { Navigate, useLocation } from "react-router-dom";
interface CheckAuthProps {
  isAuthenticated: boolean;
  user: any;
  children: React.ReactNode;
}

function CheckAuth({ isAuthenticated, user, children }: CheckAuthProps) {
  const location = useLocation();
  // console.log("CheckAuth:", { path: location.pathname, isAuthenticated, user });

  // Allow the auth pages to render during the authentication process
  if (location.pathname.includes("/auth/")) {
    if (isAuthenticated && user) {
      // Only redirect if we're fully authenticated
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
    return <>{children}</>;
  }

  // Root path redirects
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // Protected routes checks
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Role-based access checks
  if (user?.role !== "admin" && location.pathname.includes("/admin")) {
    return <Navigate to="/unauth-page" />;
  }

  if (user?.role === "admin" && location.pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
