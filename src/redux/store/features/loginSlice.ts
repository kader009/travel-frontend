import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginState } from '@/src/types/auth';

const initialState: LoginState = {
  email: '',
  password: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const { setEmail, setPassword } = loginSlice.actions;
export default loginSlice.reducer;