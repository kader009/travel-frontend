import { baseApi } from './baseApi';
import { ITravelPlan } from '@/src/types/travelPlan';
import { IApiResponse } from '@/src/types/dashboard';
import { IUser } from '@/src/types/user';

const TravelApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<IApiResponse<IUser>, Partial<IUser>>({
      query: (userInfo) => ({
        url: '/api/v1/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),

    login: build.mutation<IApiResponse<{ user: IUser; token: string }>, Partial<IUser>>({
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

    updateUser: build.mutation<IApiResponse<IUser>, { id: string; data: Partial<IUser> }>({
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

    getMyTravelPlans: build.query<IApiResponse<ITravelPlan[]>, void>({
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

    updateTravelPlan: build.mutation<IApiResponse<ITravelPlan>, { id: string; data: Partial<ITravelPlan> }>({
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
  useUpdateTravelPlanMutation,
  useDeleteTravelPlanMutation,
} = TravelApi;