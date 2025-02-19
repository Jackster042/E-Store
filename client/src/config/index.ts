import { ReactNode } from "react";

interface FormControl {
  name: string;
  label: string;
  placeholder: string;
  componentType: "input" | "select" | "checkbox" | "radio" | "textarea";
  type: string;
}

export const registerFormControls: FormControl[] = [
  {
    name: "userName",
    label: "user name",
    placeholder: "Enter your name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls: FormControl[] = [
  {
    name: "email",
    label: "email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
