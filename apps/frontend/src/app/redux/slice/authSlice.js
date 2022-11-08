import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logOut: (state, action) => {
      state.user = null;
      deleteCookie('access_token');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
