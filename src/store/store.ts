import alertsSlice from "@/store/alerts-slice/alerts.slice";
import userSlice from "@/store/user-slice/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "@/store/search-slice/search.slice";

export const store = configureStore({
  reducer: {
    alerts: alertsSlice,
    user: userSlice,
    search: searchSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
