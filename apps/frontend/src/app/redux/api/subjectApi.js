import { apiSlice } from './apiSlice';

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query({
      query: (id) => `/subject/${id}`,
    }),
  }),
});

export const { useGetSubjectQuery } = subjectApi;
