import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "@/redux/slices/authSlice";
import { useEffect } from "react";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      })).unwrap();
      // Registration successful, user will be redirected by useEffect
    } catch (err) {
      // Error is handled by Redux state
      console.error("Registration failed:", err);
    }
  };

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>
      
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          name="fullName"
          label="Full Name"
          control={control}
          Component={TextInput}
          rules={{ required: "Full name is required" }}
        />
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />
        <Button 
          variant="contained" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-primary">Sign in instead</Link>
      </p>
    </div>
  );
};

export default RegisterPage;