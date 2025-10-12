import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, setUser, setSession } from '@/redux/slices/authSlice';
import { authService } from '@/services/auth.service';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // Initialize auth on mount
  useEffect(() => {
    if (!auth.isInitialized) {
      dispatch(checkAuth());
    }

    // Listen to auth state changes
    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      
      if (session) {
        dispatch(setSession(session));
        dispatch(setUser(session.user));
      } else {
        dispatch(setSession(null));
        dispatch(setUser(null));
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch, auth.isInitialized]);

  return auth;
};