import { configureStore } from "@reduxjs/toolkit";

import articalReducer from "./articalSlice";

export const store = configureStore({
  reducer: {
    artical: articalReducer,
  },
});

// Define RootState and AppDispatch types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
