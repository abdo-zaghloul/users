import * as Yup from "yup";
import { 
  nameField,
  emailField,
  phoneField,
  passwordField,
  rePasswordField
} from "./validationFields";

// Signup schema
export const signupValidationSchema = Yup.object({
  name: nameField,
  email: emailField,
  phone: phoneField,
  password: passwordField,
  rePassword: rePasswordField,
});

// Login schema
export const loginValidationSchema = Yup.object({
  email: emailField,
  password: passwordField,
});
