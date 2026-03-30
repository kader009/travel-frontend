import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { logout, setToken } from '@/src/redux/store/features/userSlice';
import { Mutex } from 'async-mutex';
import { RefreshResponse } from '@/src/types/auth';
import { toast } from 'sonner';

// Create a new mutex to prevent multiple simultaneous refresh calls
const mutex = new Mutex();

// Main baseQuery — sends access token in Authorization header
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

// Separate baseQuery for refresh — DOES NOT send the expired access token
// Uses the refreshToken from Redux to authorize the refresh call
const refreshBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKENDAPI,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const refreshToken = (getState() as { user: { refreshToken: string | null } }).user.refreshToken;
    if (refreshToken) {
      headers.set('authorization', `Bearer ${refreshToken}`);
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
  // Wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  
  let result = await baseQuery(args, api, extraOptions);

  // Check for 401 Unauthorized response (Access Token Expired)
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        console.log('[Auth] Access token expired, attempting silent refresh...');

        const state = api.getState() as { user: { refreshToken: string | null } };
        const refreshToken = state.user.refreshToken;

        const refreshResult = await refreshBaseQuery(
          {
            url: '/api/v1/auth/refresh',
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const newAccessToken = (refreshResult.data as RefreshResponse)?.data?.accessToken;
          if (newAccessToken) {
            console.log('[Auth] Token refreshed successfully!');
            // Store the new token in Redux
            api.dispatch(setToken(newAccessToken));
            
            // Retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.warn('[Auth] Refresh response missing accessToken, logging out.');
            api.dispatch(logout());
            toast.error('Session expired', {
              description: 'Please log in again to continue.',
            });
          }
        } else {
          // Refresh failed - logout user
          console.warn('[Auth] Refresh request failed:', refreshResult.error);
          api.dispatch(logout());
          toast.error('Session expired', {
            description: 'Your session has ended. Please log in again.',
          });
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
  reducerPath: 'travelApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Review',
    'Comment',
    'Vote',
    'PendingReview',
    'UserReview',
    'User',
    'Category',
    'TravelPlan',
    'Payment',
    'JoinRequest',
  ],
  endpoints: () => ({}),
});