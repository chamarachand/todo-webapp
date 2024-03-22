import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required().min(5).max(255).label("Email"),
  password: yup.string().required().min(3).max(1024).label("Password"),
});

export const signupSchema = yup.object().shape({
  firstName: yup.string().required().min(2).max(50).label("First Name"),
  lastName: yup.string().required().min(2).max(50).label("Last Name"),
  email: yup.string().email().required().min(5).max(255).label("Email"),
  password: yup.string().min(3).required().max(1024).label("Password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("This is a required field"),
});
