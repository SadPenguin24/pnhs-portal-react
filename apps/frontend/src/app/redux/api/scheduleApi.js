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
    getParsedSchedule: builder.query({
      query: (id) => `/schedule/parsed/${id}`,
    }),
    createSchedule: builder.mutation({
      query: (body) => ({
        url: '/schedule/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetScheduleQuery,
  useGetParsedScheduleQuery,
  useCreateScheduleMutation,
} = scheduleApi;
