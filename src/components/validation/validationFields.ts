import * as Yup from "yup";

export const nameField = Yup.string()
  .min(2, "Name must be at least 2 characters")
  .required("Name is required");

export const emailField = Yup.string()
  .email("Invalid email address")
  .required("Email is required");

export const phoneField = Yup.string()
  .matches(/^01[0-9]{9}$/, "Phone number must be 11 digits and start with 01")
  .required("Phone is required");

export const passwordField = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("Password is required");

export const rePasswordField = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords must match")
  .required("Confirm Password is required");
