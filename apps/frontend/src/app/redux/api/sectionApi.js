import { apiSlice } from './apiSlice';

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query({
      query: () => '/section/',
      providesTags: ['Section'],
    }),
    getSection: builder.query({
      query: (id) => `/section/${id}`,
    }),
    createSection: builder.mutation({
      query: (credentials) => ({
        url: '/section/create',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Section'],
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useCreateSectionMutation,
} = sectionApi;
