import { apiSlice } from './apiSlice';

export const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => '/schedule/',
      providesTags: ['Schedule'],
    }),
    getSchedule: builder.query({
      query: (id) => `/schedule/${id}`,
    }),
    createSchedule: builder.mutation({
      query: (credentials) => ({
        url: '/schedule/create',
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetScheduleQuery,
  useCreateScheduleMutation,
} = scheduleApi;
