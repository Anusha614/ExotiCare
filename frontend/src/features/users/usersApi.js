import { api } from '../../services/api';

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
    }),

    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    getAllUsers: builder.query({
      query: () => '/users',
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    updateUserById: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),

    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = usersApi;