import { createContext, useCallback, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = () => useContext(SnackbarContext);

const DEFAULT_ANCHOR_ORIGIN = { vertical: "bottom", horizontal: "left" };

const SnackbarProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "info",
    autoHideDuration: 4000,
  });

  const openSnackbar = useCallback((options) => {
    const { message, severity = "info", autoHideDuration } = options || {};
    if (!message) return;

    setSnackbarState({
      open: true,
      message,
      severity,
      autoHideDuration: autoHideDuration ?? 4000,
    });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbarState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={snackbarState.autoHideDuration}
        onClose={closeSnackbar}
        anchorOrigin={DEFAULT_ANCHOR_ORIGIN}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
