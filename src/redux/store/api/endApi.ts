import { baseApi } from './baseApi';
import { ITravelPlan } from '@/src/types/travelPlan';
import { IApiResponse } from '@/src/types/dashboard';

const TravelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (userInfo) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

    login: build.mutation({
      query: (userInfo) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),

    getAllUsers: build.query({
      query: () => {
        return {
          url: '/api/v1/users/admin/all-users',
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/api/v1/users/delete-user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),

    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/users/admin/update-user/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updateProfile: build.mutation({
      query: (data) => ({
        url: '/api/v1/users/update-profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    getMyTravelPlans: build.query<IApiResponse<ITravelPlan[]>, any>({
      query: () => ({
        url: '/api/v1/travel-plans/user/my-plans',
        method: 'GET',
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'TravelPlan' as const, id: _id })),
              { type: 'TravelPlan', id: 'LIST' },
            ]
          : [{ type: 'TravelPlan', id: 'LIST' }],
    }),

    createTravelPlan: build.mutation<IApiResponse<ITravelPlan>, Partial<ITravelPlan>>({
      query: (data) => ({
        url: '/api/v1/travel-plans',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'TravelPlan', id: 'LIST' }],
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
  useGetMyTravelPlansQuery,
  useCreateTravelPlanMutation,
} = TravelApi;