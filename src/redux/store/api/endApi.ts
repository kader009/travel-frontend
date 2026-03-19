import { baseApi } from './baseApi';

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
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = TravelApi;