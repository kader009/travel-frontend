import { IUser, TUserRole } from './user';

export interface LoginResponse {
  user: IUser;
  token: string;
  refreshToken?: string;
  name?: string | null | undefined;
  email?: string | null;
  image?: string | null;
  role?: string;
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface LoginState {
  email: string;
  password: string;
}

export interface RegisterState {
  name: string;
  email: string;
  password: string;
  image: string;
  role: TUserRole | '';
}
