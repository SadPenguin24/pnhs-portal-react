import { apiSlice } from './apiSlice';

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query({
      query: () => '/section/',
      providesTags: ['Section'],
    }),
    // getSubject: builder.query({
    //   query: (id) => `/subject/${id}`,
    // }),
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

export const { useGetSectionsQuery, useCreateSectionMutation } = sectionApi;
