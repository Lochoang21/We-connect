import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/api';
import { saveAuth, clearAuth, getToken, getRefreshToken, getUser } from '@services/auth';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      // Expecting { statusCode, message, data: { user, access_token, refresh_token } }
      const { data } = res.data || {};
      if (!data || !data.access_token) {
        return rejectWithValue('Invalid login response');
      }
      return data; // { user, access_token, refresh_token }
    } catch (err) {
      const errorData = err?.response?.data || {};
      const msg = errorData.message || errorData.error || 'Login failed';

      // Map backend error to a numeric code similar to authenticate() example
      let code = errorData.code;

      // Nếu backend không trả code, tự gán dựa trên message
      if (typeof code !== 'number') {
        if (msg?.includes('Tài khoản chưa được kích hoạt')) {
          code = 2; // inactive account
        } else {
          code = 0; // other errors
        }
      }

      return rejectWithValue({ message: msg, code });
    }
  }
);

const initialState = {
  user: getUser(),
  token: getToken(),
  refreshToken: getRefreshToken(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  errorCode: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token, refreshToken } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
      state.refreshToken = refreshToken || null;
      saveAuth({ user, token, refreshToken });
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.status = 'idle';
      state.error = null;
      state.errorCode = null;
      clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.errorCode = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        saveAuth({ user: state.user, token: state.token, refreshToken: state.refreshToken });
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        if (typeof action.payload === 'string' || action.payload == null) {
          state.error = action.payload || 'Login failed';
          state.errorCode = null;
        } else {
          state.error = action.payload.message || 'Login failed';
          state.errorCode = typeof action.payload.code === 'number' ? action.payload.code : null;
        }
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
