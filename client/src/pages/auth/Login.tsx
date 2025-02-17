import React, { useState } from "react";

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

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // console.log(formData);
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.status === "success") {
        toast({
          title: "Success",
          description: data?.payload?.message,
        });
        navigate("/shop/home");
      } else {
        toast({
          // title: "Error",
          description: data?.payload?.response?.message,
          variant: "destructive",
        });
      }
    });
  }

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
        buttonText="Sign In"
      />
    </div>
  );
};

export default AuthLogin;
