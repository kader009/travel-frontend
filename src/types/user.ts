export type TUserRole = 'admin' | 'user';
export type TUserStatus = 'active' | 'in-active';
export type TAuthProvider = 'google' | 'facebook' | 'local';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  bio?: string;
  travelInterests?: string[];
  visitedCountries?: string[];
  currentLocation?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  isVerified?: boolean;
  role: TUserRole;
  status?: TUserStatus;
  provider?: TAuthProvider;
  isDeleted?: boolean;
  createdAt?: Date;
}

export interface IApiError {
  data?: {
    message?: string;
  };
}

export type TMaybeUser = string | IUser | { $oid: string } | null | undefined;
