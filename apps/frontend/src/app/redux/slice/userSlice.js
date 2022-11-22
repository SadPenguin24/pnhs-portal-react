import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: { user: null, users: null, students: null },
  reducers: {
    getProfile: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    setAllUsers: (state, action) => {
      const { users } = action.payload;
      state.users = users;
    },
    setStudents: (state, action) => {
      const { students } = action.payload;
      state.students = students;
    },
  },
});

export const { setAllUsers, setStudents } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
