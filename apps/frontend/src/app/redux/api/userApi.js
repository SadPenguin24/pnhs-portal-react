import { apiSlice } from './apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    getAllProfile: builder.query({
      query: () => '/user/',
      providesTags: ['User'],
    }),
    getRole: builder.query({
      query: (role_name) => `/user/role/${role_name}`,
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: ['User'],
    }),
    convertEtos: builder.mutation({
      query: (id) => ({
        url: `/user/etos/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Enrollee'],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body: { ...body },
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/update/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
    updateGrade: builder.mutation({
      query: ({ studentId, subjectId, ...body }) => ({
        url: `/user/${studentId}/${subjectId}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: ['Section', 'User'],
    }),
    deleteReportCard: builder.mutation({
      query: ({ studentId, currentSubject }) => ({
        url: `/delete/reportcard/${studentId}/${currentSubject}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Section', 'User'],
    }),
    confirmPassword: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/user/cpassword/${id}`,
        method: 'PATCH',
        body: body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetAllProfileQuery,
  useGetRoleQuery,
  useGetUserByIdQuery,
  useConvertEtosMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateGradeMutation,
  useDeleteReportCardMutation,
  useConfirmPasswordMutation,
} = userApi;
