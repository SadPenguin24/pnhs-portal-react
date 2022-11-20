import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
    }),
    getAllProfile: builder.query({
      query: () => '/user/',
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
    }),
    convertEtos: builder.mutation({
      query: (id) => ({
        url: `/user/etos/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Enrollee'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAllProfileQuery,
  useGetUserByIdQuery,
  useConvertEtosMutation,
} = userApi;
