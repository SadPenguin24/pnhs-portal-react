import { createSlice } from '@reduxjs/toolkit';

const sectionSlice = createSlice({
  name: 'section',
  initialState: { sections: null, section: null },
  reducers: {
    getSections: (state, action) => {
      const { sections } = action.payload;
      state.sections = sections;
    },
    // getSubject: (state, action) => {
    //   const { subject } = action.payload;
    //   state.subject = subject;
    // },
    createSection: (state, action) => {
      const { section } = action.payload;
      state.section = section;
    },
  },
});

export const { getSections, createSection } = sectionSlice.actions;

export default sectionSlice.reducer;
