import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'auth/login/fulfilled',
          'auth/register/fulfilled',
          'auth/checkAuth/fulfilled'
        ],
        ignoredPaths: ['auth.session', 'auth.user'],
      },
    }),
});