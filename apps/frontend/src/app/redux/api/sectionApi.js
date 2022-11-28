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
      query: (body) => ({
        url: '/section/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Section'],
    }),
    getParsedSections: builder.query({
      query: () => '/section/parsed',
      providesTags: ['Section'],
    }),
    getParsedSection: builder.query({
      query: (id) => `/section/parsed/${id}`,
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useCreateSectionMutation,
  useGetParsedSectionsQuery,
  useGetParsedSectionQuery,
} = sectionApi;
