import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
    }),
    getAllProfile: builder.query({
      query: () => '/user/',
    }),
    getRole: builder.query({
      query: (role_name) => `/user/role/${role_name}`,
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
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
} = userApi;
