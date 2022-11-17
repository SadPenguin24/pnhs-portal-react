import { apiSlice } from './apiSlice';

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => '/subject/',
      providesTags: ['Subject'],
    }),
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

export const {
  useGetSubjectsQuery,
  useGetSubjectQuery,
  useCreateSubjectMutation,
} = subjectApi;
