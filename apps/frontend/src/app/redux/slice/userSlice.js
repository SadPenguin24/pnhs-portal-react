import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logOut: (state, action) => {
      state.user = null;
    },
  },
});

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
