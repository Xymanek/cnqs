import { configureStore } from '@reduxjs/toolkit';
import { backendApi } from './backendApi';
import { uploaderSlice } from './uploader/uploaderSlice';
import { uploaderTriggerMiddleware } from './uploader/uploaderTrigger';

export const store = configureStore({
  reducer: {
    [backendApi.reducerPath]: backendApi.reducer,
    [uploaderSlice.reducerPath]: uploaderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(uploaderTriggerMiddleware.middleware)
      .concat(backendApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
