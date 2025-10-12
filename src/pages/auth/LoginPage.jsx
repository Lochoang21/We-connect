import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "@/redux/slices/authSlice";
import { useEffect } from "react";

const LoginPage = () => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser({
        email: data.email,
        password: data.password,
      })).unwrap();
      
      // ✅ PublicRoute sẽ tự redirect sau khi login success
      navigate('/');
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>
      
      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
          rules={{ required: "Password is required" }}
        />
        <Button 
          variant="contained" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="text-center mt-4">
        New on our platform?{" "}
        <Link to="/register" className="text-primary">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;