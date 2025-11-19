import  { useState } from "react";
import { FormInput } from "../components/common/FormInput/FormInput";
import { Button } from "../components/common/Button/Button";
import axios from "axios";
import axiosApi from "../api/config";
import { useFormik } from "formik";
 import type { InferType } from "yup";
import { signupValidationSchema } from "../components/validation/validationSchemas";

interface ApiResponse {
  message?: string;
  error?: string;
  user?: {
    name: string;
    email: string;
    phone: string;
    _id: string;
    role?: string;
  };
  token?: string;
  statusMsg?: string;
}

type SignupFormValues = InferType<typeof signupValidationSchema>;

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: signupValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        const response = await axiosApi.post<ApiResponse>(
          "auth/signup",
          values
        );

        console.log(response.data);

      } catch (err: unknown) {

        if (axios.isAxiosError(err) && err.response?.data) {
          setError(err.response.data.message);
        } 
        else {
          setError("An error occurred during signup");
        }

      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">

        <FormInput
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          value={formik.values.name}
          onChange={(value) => formik.setFieldValue("name", value)}
          error={formik.touched.name && formik.errors.name ? formik.errors.name : ""}
        />

        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={(value) => formik.setFieldValue("email", value)}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
        />

        <FormInput
          label="Phone"
          type="tel"
          placeholder="Enter your phone number"
          value={formik.values.phone}
          onChange={(value) => formik.setFieldValue("phone", value)}
          error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={(value) => formik.setFieldValue("password", value)}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formik.values.rePassword}
          onChange={(value) => formik.setFieldValue("rePassword", value)}
          error={formik.touched.rePassword && formik.errors.rePassword ? formik.errors.rePassword : ""}
        />

        <Button
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
