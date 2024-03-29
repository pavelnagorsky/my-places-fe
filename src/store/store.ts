import { configureStore } from "@reduxjs/toolkit";
import alertsSlice from "@/store/alerts-slice/alerts.slice";
import userSlice from "@/store/user-slice/user.slice";

export const store = configureStore({
  reducer: {
    alerts: alertsSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
