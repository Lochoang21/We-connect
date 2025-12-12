import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import RegisterOtpModal from "@/components/Auth/RegisterOtpModal";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import api from "@services/api";
import { useSnackbar } from "@context/SnackbarProvider";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredId, setRegisteredId] = useState(null);
  const { openSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.fullName,
        email: data.email,
        password: data.password,
      };

      const res = await api.post("/auth/register", payload);
      const { data: resData } = res.data || {};

      if (!resData?.id) {
        throw new Error("Invalid register response");
      }

      setRegisteredEmail(data.email);
      setRegisteredId(resData.id);
      setOpenOtpModal(true);

      openSnackbar({
        message: "Đăng ký thành công. Vui lòng kiểm tra email để lấy mã xác nhận.",
        severity: "success",
      });
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Đăng ký thất bại. Vui lòng thử lại.";
      openSnackbar({
        message,
        severity: "error",
      });
    }
  };

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">Register</p>

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
        >
          Sign up
        </Button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-primary">Sign in instead</Link>
      </p>

      <RegisterOtpModal
        open={openOtpModal}
        email={registeredEmail}
        registeredId={registeredId}
        onClose={() => setOpenOtpModal(false)}
      />
    </div>
  );
};

export default RegisterPage;