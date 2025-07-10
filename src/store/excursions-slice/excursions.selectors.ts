import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

// Other code such as selectors can use the imported `RootState` type
const selectState = createSelector(
  (state: RootState) => state,
  (s) => s.excursions
);

export const selectSearchFilters = createSelector(
  selectState,
  (s) => s.filters
);

export const selectItems = createSelector(selectState, (s) => s.items);

export const selectTotalItems = createSelector(
  selectState,
  (s) => s.totalItems
);

export const selectHasMore = createSelector(selectState, (s) => s.hasMore);

export const selectNoItems = createSelector(selectState, (s) => s.noItems);

export const selectCurrentItemsLength = createSelector(
  selectItems,
  (s) => s.length
);

export const selectIsDataFetched = createSelector(
  selectState,
  (s) => s.isDataFetched
);

export const selectScrollPosition = createSelector(
  selectState,
  (s) => s.scrollPosition
);

export const selectSearchFiltersLoading = createSelector(
  selectState,
  (s) => s.loading
);

export const selectRegions = createSelector(selectState, (s) => s.regions);

export const selectCities = createSelector(selectState, (s) => s.cities);

export const selectPlaceTypes = createSelector(
  selectState,
  (s) => s.placeTypes
);
