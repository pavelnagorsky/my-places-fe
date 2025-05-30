import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISearchForm } from "@/containers/places/logic/interfaces";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { ISelect } from "@/shared/interfaces";
import {
  getMapResultsThunk,
  getPlaceCategoriesThunk,
  getPlaceTypesThunk,
  getSearchResultsThunk,
} from "@/store/search-slice/thunks";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { defaultSearchFilters } from "@/containers/places/logic/default-filters";

interface ISearchState {
  hasMore: boolean;
  noItems: boolean;
  items: ISearchPlace[];
  totalItems: number;
  filters: ISearchForm;
  isDataFetched: boolean;
  mapResults: ISearchPlace[];
  scrollPosition: number;
  loading: boolean;
  isMapOpen: boolean;
  // filters options
  placeTypes: IPlaceType[];
  placeCategories: IPlaceCategory[];
}

const initialState: ISearchState = {
  loading: false,
  hasMore: true,
  noItems: false,
  isMapOpen: false,
  items: [],
  totalItems: 0,
  filters: defaultSearchFilters,
  isDataFetched: false,
  mapResults: [],
  scrollPosition: 0,
  placeTypes: [],
  placeCategories: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setMapOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isMapOpen = payload;
    },
    setFilters: (state, { payload }: PayloadAction<ISearchForm>) => {
      state.filters = payload;
    },
    setScrollPosition: (state, { payload }: PayloadAction<number>) => {
      state.scrollPosition = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResultsThunk.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loading = true;
        state.items = [];
      }
      state.hasMore = true;
      state.noItems = false;
      state.isDataFetched = true;
    });
    builder.addCase(getSearchResultsThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      const fromStart = payload.page === 0;
      const updatedItems = fromStart
        ? payload.items
        : state.items.concat(payload.items);
      state.totalItems = payload.totalItems;
      state.noItems = updatedItems.length === 0;
      state.hasMore = payload.totalPages > payload.page + 1;
      state.items = updatedItems;
    });
    builder.addCase(getSearchResultsThunk.rejected, (state, action) => {
      state.loading = false;
      state.noItems = state.items.length === 0;
      state.hasMore = false;
    });

    builder.addCase(getMapResultsThunk.pending, (state, action) => {
      // state.mapResults = [];
    });

    builder.addCase(getMapResultsThunk.fulfilled, (state, { payload }) => {
      state.mapResults = payload.items;
    });

    builder.addCase(getPlaceTypesThunk.fulfilled, (state, { payload }) => {
      state.placeTypes = payload;
    });

    builder.addCase(getPlaceCategoriesThunk.fulfilled, (state, { payload }) => {
      state.placeCategories = payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
const selectSearchState = createSelector(
  (state: RootState) => state,
  (s) => s.search
);

export const selectSearchFilters = createSelector(
  selectSearchState,
  (s) => s.filters
);

export const selectItems = createSelector(selectSearchState, (s) => s.items);

export const selectTotalItems = createSelector(
  selectSearchState,
  (s) => s.totalItems
);

export const selectHasMore = createSelector(
  selectSearchState,
  (s) => s.hasMore
);

export const selectNoItems = createSelector(
  selectSearchState,
  (s) => s.noItems
);

export const selectCurrentItemsLength = createSelector(
  selectItems,
  (s) => s.length
);

export const selectIsDataFetched = createSelector(
  selectSearchState,
  (s) => s.isDataFetched
);

export const selectMapResults = createSelector(
  selectSearchState,
  (s) => s.mapResults
);

export const selectScrollPosition = createSelector(
  selectSearchState,
  (s) => s.scrollPosition
);

export const selectSearchFiltersLoading = createSelector(
  selectSearchState,
  (s) => s.loading
);

export const selectPlaceTypesOptions = createSelector(selectSearchState, (s) =>
  s.placeTypes.map((type) => ({
    id: type.id,
    label: type.title,
  }))
);

export const selectPlaceCategoriesOptions = createSelector(
  selectSearchState,
  (s) =>
    s.placeCategories.map((category) => ({
      id: category.id,
      label: category.title,
    }))
);

export const selectIsMapOpen = createSelector(
  selectSearchState,
  (s) => s.isMapOpen
);

export const { setFilters, setScrollPosition, setMapOpen } =
  searchSlice.actions;

export default searchSlice.reducer;
