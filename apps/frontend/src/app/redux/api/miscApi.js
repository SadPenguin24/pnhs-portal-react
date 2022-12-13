import { apiSlice } from './apiSlice';

export const miscApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMiscs: builder.query({
      query: () => '/misc/',
      providesTags: ['Misc'],
    }),
    getMisc: builder.query({
      query: (id) => `/misc/${id}`,
      providesTags: ['Misc'],
    }),
    createMisc: builder.mutation({
      query: (body) => ({
        url: '/misc/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Misc'],
    }),
    updateBool: builder.mutation({
      query: (body) => ({
        url: '/misc/update/bool',
        method: 'PUT',
        body: { ...body },
      }),
      invalidatesTags: ['Misc'],
    }),
  }),
});

export const {
  useGetMiscsQuery,
  useGetMiscQuery,
  useCreateMiscMutation,
  useUpdateBoolMutation,
} = miscApi;
