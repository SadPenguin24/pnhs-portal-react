import { apiSlice } from './apiSlice';

export const curriculumApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurriculums: builder.query({
      query: () => '/curriculum/',
      providesTags: ['Curriculum'],
    }),
    getCurriculum: builder.query({
      query: (id) => `/curriculum/${id}`,
      providesTags: ['Curriculum'],
    }),
    createCurriculum: builder.mutation({
      query: (body) => ({
        url: '/curriculum/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Curriculum'],
    }),
    updateCurriculum: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/curriculum/update/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Curriculum'],
    }),
  }),
});

export const {
  useGetCurriculumsQuery,
  useGetCurriculumQuery,
  useCreateCurriculumMutation,
  useUpdateCurriculumMutation,
} = curriculumApi;
