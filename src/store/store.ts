import { configureStore } from "@reduxjs/toolkit";
import searchResultsSlice from "@/store/search-results-slice/search-results.slice";
import alertsSlice from "@/store/alerts-slice/alerts.slice";
import userSlice from "@/store/user-slice/user.slice";

export const store = configureStore({
  reducer: {
    searchResults: searchResultsSlice,
    alerts: alertsSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
