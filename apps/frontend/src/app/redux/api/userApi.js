import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
