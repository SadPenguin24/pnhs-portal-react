import { createSlice } from '@reduxjs/toolkit';

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: { schedules: null, schedule: null },
  reducers: {
    getSchedules: (state, action) => {
      const { schedules } = action.payload;
      state.schedules = schedules;
    },
    getSchedule: (state, action) => {
      const { schedule } = action.payload;
      state.schedule = schedule;
    },
    createSchedule: (state, action) => {
      const { schedule } = action.payload;
      state.schedule = schedule;
    },
  },
});

export const { getSchedules, getSchedule, createSchedule } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
