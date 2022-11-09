import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
    }),
    getAllProfile: builder.query({
      query: () => '/user/',
    }),
  }),
});

export const { useGetProfileQuery, useGetAllProfileQuery } = userApi;
