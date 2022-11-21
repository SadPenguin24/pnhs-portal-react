import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { apiSlice } from './api/apiSlice';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice'
import enrolleeReducer from './slice/enrolleeSlice'
import subjectReducer from './slice/subjectSlice'
import sectionReducer from './slice/sectionSlice'
import scheduleReducer from './slice/scheduleSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    enrollee: enrolleeReducer,
    subject: subjectReducer,
    section: sectionReducer,
    schedule: scheduleReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
