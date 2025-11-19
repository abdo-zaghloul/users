import   { useState } from "react";
import { FormInput } from "../components/common/FormInput/FormInput";
import { Button } from "../components/common/Button/Button";
import { useFormik } from "formik";
// import { loginValidationSchema } from "../utils/validationSchemas";
import type { InferType } from "yup";
import { loginValidationSchema } from "../components/validation/validationSchemas";

type LoginFormValues = InferType<typeof loginValidationSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        console.log("Login submitted:", values);
        // هنا تقدر تستخدم axiosApi.post("/auth/login", values)
      } catch {
        setError("An error occurred during login");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-sm mx-auto mt-10 p-5 border rounded shadow">
      <h1 className="text-2xl font-bold mb-5">Login</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        <FormInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={(value) => formik.setFieldValue("email", value)}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
        />

        <FormInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={(value) => formik.setFieldValue("password", value)}
          error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
        />

        <Button
          type="submit"
          className="w-full mt-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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
