import { apiSlice } from './apiSlice';

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubject: builder.query({
      query: (id) => `/subject/${id}`,
    }),
    createSubject: builder.mutation({
      query: (credentials) => ({
        url: '/subject/create',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Subject'],
    }),
  }),
});

export const { useGetSubjectQuery, useCreateSubjectMutation } = subjectApi;
