import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IUser } from '@/src/types/user';
import { AuthState, LoginResponse } from '@/src/types/auth';
import { IApiResponse } from '@/src/types/dashboard';

// Initial state (no localStorage used)
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// API Response interface (specific to login)
interface IAuthApiResponse extends IApiResponse<{
  user: IUser;
  accessToken: string;
  refreshToken: string;
}> {}

// Async thunk for login
export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post<IAuthApiResponse>(
      `${process.env.NEXT_PUBLIC_BACKENDAPI}/api/v1/auth/login`,
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
    updateUserDetails: (state, action: PayloadAction<Partial<IUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
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

export const { setUser, setToken, updateUserDetails, logout } = userSlice.actions;
export default userSlice.reducer;
