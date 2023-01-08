import { apiSlice } from './apiSlice';

export const sectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSections: builder.query({
      query: () => '/section/',
      providesTags: ['Section'],
    }),
    getSection: builder.query({
      query: (id) => `/section/${id}`,
      providesTags: ['Section'],
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
      providesTags: ['Section'],
    }),
    updateSection: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/section/update/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Section', 'User'],
    }),
    deleteSection: builder.mutation({
      query: (id) => ({
        url: `/delete/section/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Section'],
    }),
  }),
});

export const {
  useGetSectionsQuery,
  useGetSectionQuery,
  useCreateSectionMutation,
  useGetParsedSectionsQuery,
  useGetParsedSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;
