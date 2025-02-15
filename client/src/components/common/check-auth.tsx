import { Navigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

interface CheckAuthProps {
  isAuthenticated: boolean;
  user: any;
  children: React.ReactNode;
}

const CheckAuth = ({ isAuthenticated, user, children }: CheckAuthProps) => {
  const location = useLocation();
  //  RBAC ACCESS - IF USER IS NOT AUTHENTICATED AND NOT ON LOGIN OR REGISTER PAGE, REDIRECT TO LOGIN
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  //  RBAC ACCESS - IF USER IS AUTHENTICATED AND ON LOGIN OR REGISTER PAGE, REDIRECT TO HOME
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    }
    return <Navigate to="/shop/home" state={{ from: location }} replace />;
  }

  //   RESTRICT USER ACCESS TO ADMIN PAGES
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // RESTRICT ADMIN ACCESS TO SHO PAGE
  // TODO: THIS WILL STAY FOR NOW, NUT I WILL REVISIT IT LATER

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
