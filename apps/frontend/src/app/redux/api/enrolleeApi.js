import { apiSlice } from './apiSlice';

export const enrolleeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollees: builder.query({
      query: () => '/enrollee/',
    }),
    createEnrollee: builder.mutation({
      query: (credentials) => ({
        url: '/enrollee/create',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGetEnrolleesQuery, useCreateEnrolleeMutation } = enrolleeApi;
