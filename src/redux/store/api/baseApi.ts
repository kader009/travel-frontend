import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { logout, setToken } from '@/src/redux/store/features/userSlice';
import { Mutex } from 'async-mutex';

// Create a new mutex to prevent multiple simultaneous refresh calls
const mutex = new Mutex();

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

interface RefreshResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  
  let result = await baseQuery(args, api, extraOptions);

  // Check for 401 Unauthorized response (Access Token Expired)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: '/api/v1/auth/refresh',
            method: 'POST',
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as RefreshResponse)?.data?.accessToken;
          if (newAccessToken) {
            // Store the new token in Redux
            api.dispatch(setToken(newAccessToken));
            
            // Retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logout());
          }
        } else {
          // Refresh failed - logout user
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      // Wait for the mutex to be released and then retry the original request
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
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