import { createSlice } from '@reduxjs/toolkit';

const enrolleeSlice = createSlice({
  name: 'enrollees',
  initialState: { enrollees: null, enrollee: null },
  reducers: {
    getEnrollees: (state, action) => {
      const { enrollees } = action.payload;
      state.enrollees = enrollees;
    },
    getEnrolleeById: (state, action) => {
      const { enrollee } = action.payload;
      state.enrollee = enrollee;
    },
    createEnrollee: (state, action) => {
      const { enrollee } = action.payload;
      state.enrollee = enrollee;
    },
  },
});

export const { getEnrollees, getEnrolleeById, createEnrollee } =
  enrolleeSlice.actions;

export default enrolleeSlice.reducer;
