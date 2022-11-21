import { apiSlice } from './apiSlice';

export const enrolleeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollees: builder.query({
      query: () => '/enrollee/',
      providesTags: ['Enrollee'],
    }),
    getEnrolleeById: builder.query({
      query: (id) => `/enrollee/${id}`,
    }),
    createEnrollee: builder.mutation({
      query: (body) => ({
        url: '/enrollee/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Enrollee'],
    }),
  }),
});

export const {
  useGetEnrolleesQuery,
  useGetEnrolleeByIdQuery,
  useCreateEnrolleeMutation,
} = enrolleeApi;
