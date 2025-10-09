// src/components/AuthProvider.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth, setUser, setSession } from "@/redux/slices/authSlice";
import { supabase } from "@/libs/supabaseClient";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check initial session
    dispatch(checkAuth());

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch(setSession(session));
        dispatch(setUser(session.user));
      } else {
        dispatch(setSession(null));
        dispatch(setUser(null));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return children;
};

export default AuthProvider;