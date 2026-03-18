import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IUser } from '@/src/types/user';

interface LoginResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
  name?: string | null | undefined;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state (no localStorage used)
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// API Response interface
interface ApiResponse {
  success: boolean;
  message?: string;
  data: {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  };
}

// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<ApiResponse>(
      'https://travel-backend-phi-six.vercel.app/api/v1/auth/login',
      credentials,
      {
        withCredentials: true,
      },
    );

    const { user, accessToken, refreshToken } = response.data.data;
    return { user, token: accessToken, refreshToken };
  } catch (err) {
    let message = 'Something went wrong';
    if (axios.isAxiosError(err)) {
      const axiosErr = err as AxiosError<{ message?: string }>;
      message = axiosErr.response?.data.message ?? axiosErr.message;
    }
    return rejectWithValue(message);
  }
});

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.refreshToken = action.payload?.refreshToken || null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = action.payload ?? action.error.message ?? null;
      });
  },
});

export const { setUser, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
