import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// COMPONENTS
import CommonForm from "@/components/common/form";

// CONFIG
import { loginFormControls } from "@/config";

// HOOKS
import { useToast } from "@/hooks/use-toast";

// REDUX
import { loginUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

// TODO: FIX EMPTY INPUT ERRORS
const AuthLogin = () => {
  const [formData, setFormdata] = useState(initialState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authStore
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then((data) => {
        console.log("Login response:", data);
        if (data?.payload?.success) {
          console.log("Login successful, attempting navigation...");
          toast({
            title: "Success",
            description: data?.payload?.message,
          });
        } else {
          console.log("Login failed:", data?.payload?.response?.message);
          toast({
            title: "Error",
            description: data?.payload?.response?.message,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  }

  React.useEffect(() => {
    if (isAuthenticated && user) {
      console.log("Auth state updated, user:", user);
      const targetPath =
        user.role === "admin" ? "/admin/dashboard" : "/shop/home";
      navigate(targetPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  React.useEffect(() => {
    console.log("Location changed to:", location.pathname);
  }, [location]);

  return (
    <div className="mx-auto w-full max-w-md space-x-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            to="/auth/register"
            className="text-primary font-medium hover:underline ml-2"
          >
            Register
          </Link>
        </p>
      </div>

      {/* COMMON FORM */}
      <CommonForm
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormdata}
        onSubmit={onSubmit}
        buttonText={"Sign In"}
        isBtnDisabled={false}
      />
    </div>
  );
};

export default AuthLogin;
