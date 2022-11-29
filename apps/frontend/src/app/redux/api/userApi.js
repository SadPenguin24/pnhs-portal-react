import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    getAllProfile: builder.query({
      query: () => '/user/',
      providesTags: ['User'],
    }),
    getRole: builder.query({
      query: (role_name) => `/user/role/${role_name}`,
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ['User'],
    }),
    convertEtos: builder.mutation({
      query: (id) => ({
        url: `/user/etos/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Enrollee'],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/update/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAllProfileQuery,
  useGetRoleQuery,
  useGetUserByIdQuery,
  useConvertEtosMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
