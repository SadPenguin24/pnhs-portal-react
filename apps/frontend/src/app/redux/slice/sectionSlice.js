import { createSlice } from '@reduxjs/toolkit';

const sectionSlice = createSlice({
  name: 'section',
  initialState: { sections: null },
  reducers: {
    getSections: (state, action) => {
      const { sections } = action.payload;
      state.sections = sections;
    },
    // getSubject: (state, action) => {
    //   const { subject } = action.payload;
    //   state.subject = subject;
    // },
  },
});

export const { getSections } = sectionSlice.actions;

export default sectionSlice.reducer;
