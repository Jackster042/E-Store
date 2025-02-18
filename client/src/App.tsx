import { createBrowserRouter, RouterProvider } from "react-router-dom";

// AUTH
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";

// ADMIN
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";

// SHOPPING
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import ShoppingHome from "./pages/shopping-view/home";

// NOT FOUND
import NotFound from "./pages/not-found";

// UNAUTH
import UnauthPage from "./pages/unauth-page";
import CheckAuth from "./components/common/check-auth";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App = () => {
  // USER
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.authStore
  );
  console.log(user, "user APP");
  // ROUTER
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        {
          path: "login",
          element: <AuthLogin />,
        },
        {
          path: "register",
          element: <AuthRegister />,
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <AdminLayout />
        </CheckAuth>
      ),
      children: [
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "products", element: <AdminProducts /> },
        { path: "orders", element: <AdminOrders /> },
        { path: "features", element: <AdminFeatures /> },
      ],
    },
    {
      path: "/shop",
      element: (
        <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          <ShoppingLayout />
        </CheckAuth>
      ),
      children: [
        { path: "home", element: <ShoppingHome /> },
        { path: "listing", element: <ShoppingListing /> },
        { path: "checkout", element: <ShoppingCheckout /> },
        { path: "account", element: <ShoppingAccount /> },
      ],
    },
    {
      path: "/unauth-page",
      element: <UnauthPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
