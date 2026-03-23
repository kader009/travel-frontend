import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserRole } from '@/src/types/user';
import { RegisterState } from '@/src/types/auth';

const initialState: RegisterState = {
  name: '',
  email: '',
  password: '',
  image: '',
  role: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setRole(state, action: PayloadAction<TUserRole | ''>) {
      state.role = action.payload;
    },
  },
});

export const { setName, setEmail, setPassword, setImage, setRole } =
  registerSlice.actions;
export default registerSlice.reducer;