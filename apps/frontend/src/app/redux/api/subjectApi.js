import { apiSlice } from './apiSlice';

export const subjectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubjects: builder.query({
      query: () => '/subject/',
      providesTags: ['Subject'],
    }),
    getSubject: builder.query({
      query: (id) => `/subject/${id}`,
      providesTags: ['Subject'],
    }),
    createSubject: builder.mutation({
      query: (body) => ({
        url: '/subject/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Subject'],
    }),
    updateSubject: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/subject/update/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Subject'],
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/delete/subject/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subject', 'Schedule'],
    }),
  }),
});

export const {
  useGetSubjectsQuery,
  useGetSubjectQuery,
  useCreateSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;
