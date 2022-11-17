import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: { users: null },
  reducers: {
    setAllUsers: (state, action) => {
      const { users } = action.payload;
      state.users = users;
    },
  },
});

export const { setAllUsers } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
