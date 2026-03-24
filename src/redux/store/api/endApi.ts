import { baseApi } from './baseApi';
import { ITravelPlan } from '@/src/types/travelPlan';
import { IApiResponse } from '@/src/types/dashboard';
import { IUser } from '@/src/types/user';
import { IReview, IReviewResponse } from '@/src/types/review';
import {
  IPaymentInitRequest,
  IPaymentInitResponse,
  IPaymentHistory,
  IPaymentAnalytics,
} from '@/src/types/payment';
import { IJoinRequest, ICreateJoinRequest } from '@/src/types/joinRequest';

const TravelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IApiResponse<IUser>, Partial<IUser>>({
      query: (userInfo) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

    login: build.mutation<
      IApiResponse<{ user: IUser; accessToken: string; refreshToken: string }>,
      Partial<IUser>
    >({
      query: (userInfo) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    getAllUsers: build.query<IApiResponse<IUser[]>, void>({
      query: () => {
        return {
          url: '/api/v1/users/admin/all-users',
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),

    deleteUser: build.mutation<IApiResponse<IUser>, string>({
      query: (id) => ({
        url: `/api/v1/users/delete-user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: build.mutation<
      IApiResponse<IUser>,
      { id: string; data: Partial<IUser> }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/users/admin/update-user/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateProfile: build.mutation<IApiResponse<IUser>, Partial<IUser>>({
      query: (data) => ({
        url: '/api/v1/users/update-profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getAllTravelPlans: build.query<IApiResponse<ITravelPlan[]>, void>({
      query: () => ({
        url: '/api/v1/travel-plans',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'TravelPlan' as const,
                id: _id,
              })),
              { type: 'TravelPlan', id: 'LIST' },
            ]
          : [{ type: 'TravelPlan', id: 'LIST' }],
    }),

    getMatchedTravelPlans: build.query<
      IApiResponse<ITravelPlan[]>,
      {
        destination?: string;
        startDate?: string;
        endDate?: string;
        travelType?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.destination)
          queryParams.append('destination', params.destination);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        if (
          params.travelType &&
          params.travelType !== 'All Travelers' &&
          params.travelType !== 'All'
        )
          queryParams.append('travelType', params.travelType);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        return {
          url: `/api/v1/travel-plans/match?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['TravelPlan'],
    }),

    getTravelPlanDetails: build.query<IApiResponse<ITravelPlan>, string>({
      query: (id) => ({
        url: `/api/v1/travel-plans/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'TravelPlan', id }],
    }),

    getMyTravelPlans: build.query<IApiResponse<ITravelPlan[]>, void>({
      query: () => ({
        url: '/api/v1/travel-plans/user/my-plans',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'TravelPlan' as const,
                id: _id,
              })),
              { type: 'TravelPlan', id: 'LIST' },
            ]
          : [{ type: 'TravelPlan', id: 'LIST' }],
    }),

    createTravelPlan: build.mutation<
      IApiResponse<ITravelPlan>,
      Partial<ITravelPlan>
    >({
      query: (data) => ({
        url: '/api/v1/travel-plans',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'TravelPlan', id: 'LIST' }],
    }),

    updateTravelPlan: build.mutation<
      IApiResponse<ITravelPlan>,
      { id: string; data: Partial<ITravelPlan> }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/travel-plans/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'TravelPlan', id },
        { type: 'TravelPlan', id: 'LIST' },
      ],
    }),

    deleteTravelPlan: build.mutation<IApiResponse<ITravelPlan>, string>({
      query: (id) => ({
        url: `/api/v1/travel-plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'TravelPlan', id: 'LIST' }],
    }),

    getAllTravelPlansAdmin: build.query<IApiResponse<ITravelPlan[]>, void>({
      query: () => ({
        url: '/api/v1/travel-plans/admin/all',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'TravelPlan' as const,
                id: _id,
              })),
              { type: 'TravelPlan', id: 'LIST' },
            ]
          : [{ type: 'TravelPlan', id: 'LIST' }],
    }),

    deleteTravelPlanAdmin: build.mutation<IApiResponse<ITravelPlan>, string>({
      query: (id) => ({
        url: `/api/v1/travel-plans/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'TravelPlan', id: 'LIST' }],
    }),

    // --- REVIEWS ENDPOINTS ---
    getReviewsForUser: build.query<IApiResponse<IReviewResponse>, string>({
      query: (userId) => ({
        url: `/api/v1/reviews/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),

    getReviewsGiven: build.query<IApiResponse<IReview[]>, void>({
      query: () => ({
        url: '/api/v1/reviews/given',
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),

    getReviewsReceived: build.query<IApiResponse<IReview[]>, void>({
      query: () => ({
        url: '/api/v1/reviews/received',
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),

    getReviewsByUser: build.query<IApiResponse<IReview[]>, string>({
      query: (userId) => ({
        url: `/api/v1/reviews/reviewer/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),

    getReviewDetails: build.query<IApiResponse<IReview>, string>({
      query: (id) => ({
        url: `/api/v1/reviews/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Review', id }],
    }),

    createReview: build.mutation<IApiResponse<IReview>, Partial<IReview>>({
      query: (data) => ({
        url: '/api/v1/reviews',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Review'],
    }),

    updateReview: build.mutation<
      IApiResponse<IReview>,
      { id: string; data: Partial<IReview> }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/reviews/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Review', id },
        'Review',
      ],
    }),

    deleteReview: build.mutation<IApiResponse<unknown>, string>({
      query: (id) => ({
        url: `/api/v1/reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Review'],
    }),

    // --- PAYMENT & SUBSCRIPTION ENDPOINTS ---
    initializeSubscription: build.mutation<
      IApiResponse<IPaymentInitResponse>,
      IPaymentInitRequest
    >({
      query: (data) => ({
        url: '/api/v1/payment/init',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),

    getPaymentHistory: build.query<IApiResponse<IPaymentHistory[]>, void>({
      query: () => ({
        url: '/api/v1/payment/history',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    getPaymentAnalytics: build.query<IApiResponse<IPaymentAnalytics>, void>({
      query: () => ({
        url: '/api/v1/payment/analytics',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // --- JOIN REQUESTS ENDPOINTS ---
    createJoinRequest: build.mutation<
      IApiResponse<IJoinRequest>,
      ICreateJoinRequest
    >({
      query: (data) => ({
        url: '/api/v1/join-requests',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['JoinRequest'],
    }),

    getMyJoinRequests: build.query<IApiResponse<IJoinRequest[]>, void>({
      query: () => ({
        url: '/api/v1/join-requests/my-requests',
        method: 'GET',
      }),
      providesTags: ['JoinRequest'],
    }),

    getJoinRequestsForPlan: build.query<IApiResponse<IJoinRequest[]>, string>({
      query: (planId) => ({
        url: `/api/v1/join-requests/plan/${planId}`,
        method: 'GET',
      }),
      providesTags: ['JoinRequest'],
    }),

    approveJoinRequest: build.mutation<IApiResponse<IJoinRequest>, string>({
      query: (id) => ({
        url: `/api/v1/join-requests/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['JoinRequest'],
    }),

    rejectJoinRequest: build.mutation<IApiResponse<IJoinRequest>, string>({
      query: (id) => ({
        url: `/api/v1/join-requests/${id}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['JoinRequest'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateProfileMutation,
  useGetAllTravelPlansQuery,
  useGetMatchedTravelPlansQuery,
  useGetTravelPlanDetailsQuery,
  useGetMyTravelPlansQuery,
  useCreateTravelPlanMutation,
  useUpdateTravelPlanMutation,
  useDeleteTravelPlanMutation,
  useGetAllTravelPlansAdminQuery,
  useDeleteTravelPlanAdminMutation,
  useGetReviewsForUserQuery,
  useGetReviewsGivenQuery,
  useGetReviewsReceivedQuery,
  useGetReviewsByUserQuery,
  useGetReviewDetailsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useInitializeSubscriptionMutation,
  useGetPaymentHistoryQuery,
  useGetPaymentAnalyticsQuery,
  useCreateJoinRequestMutation,
  useGetMyJoinRequestsQuery,
  useGetJoinRequestsForPlanQuery,
  useApproveJoinRequestMutation,
  useRejectJoinRequestMutation,
} = TravelApi;
