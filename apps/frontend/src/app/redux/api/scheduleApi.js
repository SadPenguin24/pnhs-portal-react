import { apiSlice } from './apiSlice';

export const scheduleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => '/schedule/',
      providesTags: ['Schedule'],
    }),
    getSchedule: builder.query({
      query: (id) => `/schedule/${id}`,
      providesTags: ['Schedule'],
    }),
    getParsedSchedule: builder.query({
      query: (id) => `/schedule/parsed/${id}`,
      providesTags: ['Schedule'],
    }),
    createSchedule: builder.mutation({
      query: (body) => ({
        url: '/schedule/create',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['Schedule'],
    }),
    getParsedSchedules: builder.query({
      query: () => '/schedule/parsed',
      providesTags: ['Schedule'],
    }),
    updateSchedule: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/schedule/update/${id}`,
        method: 'PUT',
        body: body,
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
  useGetParsedSchedulesQuery,
  useUpdateScheduleMutation,
} = scheduleApi;
