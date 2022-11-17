import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
    }),
    getAllProfile: builder.query({
      query: () => '/user/',
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAllProfileQuery,
  useGetUserByIdQuery,
} = userApi;
