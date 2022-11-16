import { createSlice } from '@reduxjs/toolkit';

const subjectSlice = createSlice({
  name: 'subject',
  initialState: { subject: null },
  reducers: {
    getSubject: (state, action) => {
      const { subject } = action.payload;
      state.subject = subject;
    },
  },
});

export const { getSubject } = subjectSlice.actions;

export default subjectSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
