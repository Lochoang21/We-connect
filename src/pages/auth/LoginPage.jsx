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
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
    <div className="w-full">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          name="email"
          label="Username"
          control={control}
          Component={TextInput}
          icon={<PersonOutlineIcon className="text-gray-500" />}
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
          icon={<LockOutlinedIcon className="text-gray-500" />}
          rules={{ required: "Password is required" }}
        />

        <div
          onClick={() => setOpenForgotPassword(true)}
          className="cursor-pointer text-left -mt-2"
        >
          <p className="text-sm text-gray-600 hover:text-[#246AA3] transition-colors">
            Forgot Password!
          </p>
        </div>

        <Button
          variant="contained"
          type="submit"
          disabled={status === "loading"}
          sx={{
            backgroundColor: '#246AA3',
            '&:hover': {
              backgroundColor: '#1a5280',
            },
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: 600,
            padding: '12px',
            borderRadius: '8px',
            boxShadow: 'none',
          }}
        >
          {status === "loading" ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6">
        <p className="text-center text-gray-600 text-sm mb-4">Or login with social platforms</p>
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#246AA3] hover:text-[#246AA3] transition-colors"
            onClick={() => console.log('Facebook login')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
          <button
            type="button"
            className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#246AA3] hover:text-[#246AA3] transition-colors"
            onClick={() => console.log('Google login')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          </button>
          <button
            type="button"
            className="w-12 h-12 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-[#246AA3] hover:text-[#246AA3] transition-colors"
            onClick={() => console.log('TikTok login')}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-center mt-6 text-gray-600 lg:hidden">
        New on our platform?{" "}
        <Link to="/register" className="text-[#246AA3] font-semibold hover:underline">
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