import { createSlice } from '@reduxjs/toolkit';

const subjectSlice = createSlice({
  name: 'subject',
  initialState: { subjects: null, subject: null },
  reducers: {
    getSubjects: (state, action) => {
      const { subjects } = action.payload;
      state.subjects = subjects;
    },
    getSubject: (state, action) => {
      const { subject } = action.payload;
      state.subject = subject;
    },
  },
});

export const { getSubjects, getSubject } = subjectSlice.actions;

export default subjectSlice.reducer;

export const selectCurrentUser = (state) => state.user.user;
