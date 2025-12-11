import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@services/api';
import { saveAuth, clearAuth, getToken, getUser } from '@services/auth';

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      // Expecting { statusCode, message, data: { user, access_token } }
      const { data } = res.data || {};
      if (!data || !data.access_token) {
        return rejectWithValue('Invalid login response');
      }
      return data; // { user, access_token }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      return rejectWithValue(msg);
    }
  }
);

const initialState = {
  user: getUser(),
  token: getToken(),
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.token = token || null;
      saveAuth({ user, token });
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      clearAuth();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        saveAuth({ user: state.user, token: state.token });
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
