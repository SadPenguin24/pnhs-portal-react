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
    // createSubject: builder.mutation({
    //   query: (credentials) => ({
    //     url: '/subject/create',
    //     method: 'POST',
    //     body: { ...credentials },
    //   }),
    //   invalidatesTags: ['Subject'],
    // }),
  }),
});

export const { useGetSectionsQuery } = sectionApi;
