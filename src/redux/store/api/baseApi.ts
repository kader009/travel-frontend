import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
// import { logout } from '@/src/redux/userAuth/userSlice';
// import { toast } from 'sonner';
// import { signOut } from 'next-auth/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKENDAPI,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { user: { token: string | null } }).user.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Check for 401 Unauthorized response
  if (result.error && result.error.status === 401) {
    // Dispatch logout action
    // api.dispatch(logout());

    // Show toast notification
    // toast.error('Session expired. Please login again.', {
    //   duration: 4000,
    // });

    // Sign out from NextAuth and redirect to login
    // This cleans up both Redux (via api.dispatch above) and NextAuth session cookies
    // signOut({ callbackUrl: '/login' });
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'trustedgeApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Review',
    'Comment',
    'Vote',
    'PendingReview',
    'UserReview',
    'User',
    'Category',
  ],
  endpoints: () => ({}),
});