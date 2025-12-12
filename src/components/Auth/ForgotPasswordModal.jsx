/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import OTPInput from "@components/FormInputs/OTPInput";
import api from "@services/api";

const steps = ["Enter Email", "Verify & Reset", "Complete"];

const ForgotPasswordModal = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [resetStatus, setResetStatus] = useState(null); // 'success'
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit, watch, reset: resetForm } = useForm({
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const handleClose = () => {
    setActiveStep(0);
    setEmail("");
    setOtpValue("");
    setResetStatus(null);
    setErrorMessage("");
    resetForm();
    onClose();
  };

  // Step 1: Submit email to receive OTP
  const handleEmailSubmit = async (data) => {
    try {
      setErrorMessage("");

      const res = await api.post("/auth/retry-password", {
        email: data.email,
      });

      const { data: respData } = res.data || {};

      if (!respData?.email) {
        throw new Error("Invalid forgot-password response");
      }

      setEmail(respData.email);
      setActiveStep(1);
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Failed to send OTP";
      setErrorMessage(msg);
    }
  };

  // Step 2: Verify OTP and reset password
  const handleResetPassword = async (data) => {
    try {
      if (otpValue.length !== 6) {
        setErrorMessage("Please enter complete OTP code");
        return;
      }

      if (data.newPassword !== data.confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      setErrorMessage("");

      const payload = {
        code: otpValue,
        email,
        password: data.newPassword,
        confirmPassword: data.confirmPassword,
      };

      const res = await api.post("/auth/change-password", payload);
      const { data: respData } = res.data || {};

      if (!respData?.isBeforeCheck) {
        throw new Error("Change password verification failed");
      }

      setResetStatus("success");
      setActiveStep(2);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Failed to reset password"
      );
      // Giữ nguyên bước hiện tại (bước 2) để người dùng sửa lỗi tại chỗ
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit(handleEmailSubmit)}>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter your email address and we'll send you a verification code
                to reset your password.
              </Typography>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    autoFocus
                  />
                )}
              />
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Send Code
              </Button>
            </DialogActions>
          </form>
        );

      case 1:
        return (
          <form onSubmit={handleSubmit(handleResetPassword)}>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the 6-digit code sent to <strong>{email}</strong>
              </Typography>

              <Box sx={{ mb: 3 }}>
                <OTPInput value={otpValue} onChange={setOtpValue} />
              </Box>

              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Create New Password
              </Typography>

              <Controller
                name="newPassword"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="New Password"
                    type="password"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    sx={{ mb: 2 }}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />

              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setActiveStep(0)}>Back</Button>
              <Button type="submit" variant="contained">
                Reset Password
              </Button>
            </DialogActions>
          </form>
        );

      case 2:
        return (
          <>
            <DialogContent>
              <Box sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h5"
                  color="success.main"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  ✓ Success!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Your password has been reset successfully. You can now log
                  in with your new password.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, justifyContent: "center" }}>
              <Button
                onClick={handleClose}
                variant="contained"
                size="large"
                sx={{ minWidth: 120 }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          Forgot Password
        </Typography>
      </DialogTitle>

      <Box sx={{ px: 3, pt: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {renderStepContent()}
    </Dialog>
  );
};

export default ForgotPasswordModal;
