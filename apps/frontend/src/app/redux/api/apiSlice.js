import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../slice/authSlice';
import { getCookie, setCookie } from 'cookies-next';

const port =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : 'https://pnhs-portal-api.onrender.com';

const baseQuery = fetchBaseQuery({
  baseUrl: `${port}/api/`,
  prepareHeaders: (headers, { getState }) => {
    const token = getCookie('access_token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   //403
//   if (result?.error?.originalStatus === 403 || 401) {
//     // send refresh token to get new access token
//     const refresh_token = getCookie('refresh_token');
//     const refreshResult = await baseQuery(
//       {
//         url: '/auth/refresh',
//         method: 'POST',
//         body: { refresh_token },
//       },
//       api,
//       extraOptions
//     );
//     const refreshData = refreshResult.data;

//     if (refreshData) {
//       // store the new token
//       const n_access_token = refreshData.access_token;
//       const n_refresh_token = refreshData.refresh_token;
//       setCookie('access_token', n_access_token, {
//         sameSite: 'strict',
//       });

//       setCookie('refresh_token', n_refresh_token, {
//         sameSite: 'strict',
//       });

//       // retry the original query with new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }

//   return result;
// };

export const apiSlice = createApi({
  baseQuery,
  // : baseQueryWithReauth,
  tagTypes: ['Enrollee', 'Subject', 'Section', 'Schedule'],
  endpoints: (builder) => ({}),
});
