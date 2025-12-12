import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import OTPInput from "@components/FormInputs/OTPInput";
import api from "@services/api";
import { useSnackbar } from "@context/SnackbarProvider";
import { useNavigate } from "react-router-dom";

const RegisterOtpModal = ({ open, email, registeredId, onClose }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { openSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleClose = () => {
    setOtp("");
    setError("");
    onClose?.();
  };

  const handleConfirm = async () => {
    if (otp.length !== 6) {
      setError("Vui lòng nhập đủ 6 số trong mã xác nhận.");
      return;
    }

    if (!registeredId) {
      setError("Không tìm thấy thông tin đăng ký. Vui lòng thử lại.");
      return;
    }

    try {
      const payload = {
        id: registeredId,
        code: otp,
      };

      const res = await api.post("/auth/check-code", payload);
      const { data } = res.data || {};

      if (!data?.isBeforeCheck) {
        throw new Error("OTP verification failed");
      }

      openSnackbar({
        message: "Xác nhận email thành công. Bạn có thể đăng nhập.",
        severity: "success",
      });

      handleClose();
      navigate("/login");
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Mã code không hợp lệ hoặc đã hết hạn";

      setError(message);
      openSnackbar({
        message,
        severity: "error",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Xác nhận email
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Mã xác nhận đã được gửi đến email
          {" "}
          <Typography component="span" fontWeight={600}>
            {email}
          </Typography>
          . Vui lòng nhập mã 6 số để hoàn tất đăng ký.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <OTPInput value={otp} onChange={(value) => {
            setOtp(value);
            if (error) setError("");
          }} />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose}>Hủy</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterOtpModal;
