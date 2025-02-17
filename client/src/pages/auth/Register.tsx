import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { AppDispatch } from "@/store/store"; // Adjust the import based on your file structure
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

// TODO: FIX EMPTY INPUT ERRORS
const AuthRegister = () => {
  const [formData, setFormdata] = useState(initialState);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toast } = useToast();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(formData);
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.status === "success") {
        toast({
          title: "Success",
          description: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: "Error",
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
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            to="/auth/login"
            className="text-primary font-medium hover:underline ml-2"
          >
            Login
          </Link>
        </p>
      </div>

      {/* COMMON FORM */}
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormdata}
        onSubmit={onSubmit}
        buttonText="Sign Up"
      />
    </div>
  );
};

export default AuthRegister;
