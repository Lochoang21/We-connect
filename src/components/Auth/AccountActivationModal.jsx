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
import OTPInput from "@components/FormInputs/OTPInput";
import { useSnackbar } from "@context/SnackbarProvider";
import api from "@services/api";

const steps = ["Login", "Verification", "Done"];

const AccountActivationModal = ({ open, email, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [otpValue, setOtpValue] = useState("");
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const [activationId, setActivationId] = useState(null);
  const { openSnackbar } = useSnackbar();

  const handleClose = () => {
    setActiveStep(0);
    setOtpValue("");
    setStatus(null);
    setErrorMessage("");
    setActivationId(null);
    onClose?.();
  };

  const handleResend = async () => {
    try {
      if (!email) {
        setErrorMessage("Không tìm thấy email. Vui lòng nhập lại.");
        return;
      }

      const res = await api.post("/auth/retry-active", { email });
      const { data } = res.data || {};

      if (!data?.id) {
        throw new Error("Không lấy được thông tin kích hoạt.");
      }

      setActivationId(data.id);
      setErrorMessage("");

      openSnackbar({
        message: "Đã gửi lại email kích hoạt. Vui lòng kiểm tra hộp thư.",
        severity: "info",
      });
      setActiveStep(1);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Không thể gửi lại email kích hoạt. Vui lòng thử lại.";
      setErrorMessage(message);
      openSnackbar({ message, severity: "error" });
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    if (otpValue.length !== 6) {
      setErrorMessage("Vui lòng nhập đủ 6 số trong mã xác thực.");
      return;
    }

    if (!activationId) {
      setErrorMessage(
        "Không tìm thấy thông tin kích hoạt. Vui lòng gửi lại email kích hoạt."
      );
      return;
    }

    try {
      const payload = {
        id: activationId,
        code: otpValue,
      };

      const res = await api.post("/auth/check-code", payload);
      const { data } = res.data || {};

      if (!data?.isBeforeCheck) {
        throw new Error("OTP verification failed");
      }

      setStatus("success");
      setActiveStep(2);
      openSnackbar({
        message: "Kích hoạt tài khoản thành công. Bạn có thể đăng nhập.",
        severity: "success",
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Mã kích hoạt không hợp lệ hoặc đã hết hạn.";
      setStatus("error");
      setErrorMessage(message);
      setActiveStep(2);
      openSnackbar({ message, severity: "error" });
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <DialogContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Tài khoản của bạn chưa được kích hoạt. Vui lòng kiểm tra email
                để kích hoạt tài khoản hoặc bấm vào nút bên dưới để gửi lại
                email kích hoạt.
              </Typography>

              <TextField
                label="Email"
                value={email || ""}
                fullWidth
                margin="normal"
                disabled
              />

              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleClose}>Đóng</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResend}
                disabled={!email}
              >
                Resend
              </Button>
            </DialogActions>
          </>
        );

      case 1:
        return (
          <form onSubmit={handleVerify}>
            <DialogContent>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                Nhập mã xác thực đã được gửi tới
                {" "}
                <Typography component="span" fontWeight={600}>
                  {email}
                </Typography>
                .
              </Typography>

              <Box sx={{ mb: 2 }}>
                <OTPInput value={otpValue} onChange={setOtpValue} />
              </Box>

              {errorMessage && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {errorMessage}
                </Alert>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={() => setActiveStep(0)}>Quay lại</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Active
              </Button>
            </DialogActions>
          </form>
        );

      case 2:
        return (
          <>
            <DialogContent>
              {status === "success" ? (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography
                    variant="h6"
                    color="success.main"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    ✓ Kích hoạt thành công
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tài khoản của bạn đã được kích hoạt. Bạn có thể đóng cửa
                    sổ này và đăng nhập lại.
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", py: 3 }}>
                  <Typography
                    variant="h6"
                    color="error.main"
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    ✗ Kích hoạt thất bại
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {errorMessage ||
                      "Không thể kích hoạt tài khoản. Vui lòng thử lại."}
                  </Typography>
                </Box>
              )}
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2, justifyContent: "center" }}>
              <Button
                onClick={status === "success" ? handleClose : () => setActiveStep(1)}
                variant="contained"
                size="large"
                sx={{ minWidth: 120 }}
              >
                {status === "success" ? "Đóng" : "Thử lại"}
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
          Kích hoạt tài khoản
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

export default AccountActivationModal;
