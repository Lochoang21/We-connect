import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import ForgotPasswordModal from "@/components/Auth/ForgotPasswordModal";
import AccountActivationModal from "@/components/Auth/AccountActivationModal";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useSnackbar } from "@context/SnackbarProvider";

const LoginPage = () => {
  const { control, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, errorCode } = useSelector((state) => state.auth);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openActivationModal, setOpenActivationModal] = useState(false);
  const { openSnackbar } = useSnackbar();

  const emailValue = watch("email");

  const onSubmit = async (data) => {
    const payload = { username: data.email, password: data.password };
    const result = await dispatch(login(payload));
    console.log("Login result:", result);
    if (login.fulfilled.match(result)) {
      openSnackbar({ message: "Login successfully", severity: "success" });
      navigate("/");
    }
  };

  useEffect(() => {
    if (status === "failed" && error) {
      if (errorCode === 2) {
        setOpenActivationModal(true);
      } else {
        openSnackbar({ message: error, severity: "error" });
      }
    }
  }, [status, error, errorCode, openSnackbar]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Login</p>

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
          disabled={status === "loading"}
        >
          {status === "loading" ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div onClick={() => setOpenForgotPassword(true)} className="cursor-pointer">
        <p className="text-center mt-4 text-base text-blue-500 hover:text-blue-600 transition-colors">
          Forgot your password?
        </p>
      </div>

      <p className="text-center mt-4">
        New on our platform?{" "}
        <Link to="/register" className="text-primary">
          Create an account
        </Link>
      </p>

      <ForgotPasswordModal
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      />

      <AccountActivationModal
        open={openActivationModal}
        onClose={() => setOpenActivationModal(false)}
        email={emailValue}
      />
    </div>
  );
};

export default LoginPage;