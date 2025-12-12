import { useSelector } from "react-redux";

// Simple auth hook based on Redux auth slice
export const useAuth = () => {
  const { user, token, status } = useSelector((state) => state.auth);

  const isAuthenticated = Boolean(token);
  // We read initial auth state from localStorage synchronously in authSlice,
  // so we can treat it as initialized immediately.
  const isInitialized = true;

  return {
    user,
    token,
    status,
    isAuthenticated,
    isInitialized,
  };
};
