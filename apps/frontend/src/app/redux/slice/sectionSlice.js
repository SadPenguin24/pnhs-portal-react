import { createSlice } from '@reduxjs/toolkit';

const sectionSlice = createSlice({
  name: 'section',
  initialState: { sections: null, section: null },
  reducers: {
    getSections: (state, action) => {
      const { sections } = action.payload;
      state.sections = sections;
    },
    getSection: (state, action) => {
      const { section } = action.payload;
      state.section = section;
    },
    createSection: (state, action) => {
      const { section } = action.payload;
      state.section = section;
    },
  },
});

export const { getSections, getSection, createSection } = sectionSlice.actions;

export default sectionSlice.reducer;
