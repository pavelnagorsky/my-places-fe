import alertsSlice from "@/store/alerts-slice/alerts.slice";
import userSlice from "@/store/user-slice/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "@/store/search-slice/search.slice";
import searchCartSlice from "@/store/search-cart-slice/search-cart.slice";
import searchCartCacheMiddleware from "@/store/search-cart-slice/middleware/search-cart-cache.middleware";
import routeBuilderSlice from "@/store/route-builder-slice/route-builder.slice";
import favouritesSlice from "@/store/personal-area/favourites-slice/favourites.slice";
import excursionBuilderSlice from "@/store/excursion-builder-slice/excursion-builder.slice";
import excursionsSlice from "@/store/excursions-slice/excursions.slice";

export const store = configureStore({
  reducer: {
    alerts: alertsSlice,
    user: userSlice,
    search: searchSlice,
    searchCart: searchCartSlice,
    routeBuilder: routeBuilderSlice,
    excursionBuilder: excursionBuilderSlice,
    favourites: favouritesSlice,
    excursions: excursionsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(searchCartCacheMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
