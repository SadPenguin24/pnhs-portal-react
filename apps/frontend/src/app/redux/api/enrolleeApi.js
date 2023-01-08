import { apiSlice } from './apiSlice';

export const enrolleeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollees: builder.query({
      query: () => '/enrollee/',
      providesTags: ['Enrollee'],
    }),
    getEnrolleeById: builder.query({
      query: (id) => `/enrollee/${id}`,
      providesTags: ['Enrollee'],
    }),
    createEnrollee: builder.mutation({
      query: (body) => ({
        url: '/enrollee/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Enrollee'],
    }),
    updateEnrollee: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/enrollee/update/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Enrollee'],
    }),
    deleteEnrollee: builder.mutation({
      query: (id) => ({
        url: `/delete/enrollee/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Enrollee'],
    }),
  }),
});

export const {
  useGetEnrolleesQuery,
  useGetEnrolleeByIdQuery,
  useCreateEnrolleeMutation,
  useUpdateEnrolleeMutation,
  useDeleteEnrolleeMutation,
} = enrolleeApi;
