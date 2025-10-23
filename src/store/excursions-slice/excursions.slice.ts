import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExcursionsState } from "@/store/excursions-slice/excursions.interfaces";
import { defaultSearchFilters } from "@/containers/excursions/excursions-catalog/logic/default-filters";
import { IExcursionsFilters } from "@/containers/excursions/excursions-catalog/logic/interfaces";
import {
  getCitiesThunk,
  getPlaceTypesThunk,
  getRegionsThunk,
  getSearchResultsThunk,
} from "./excursions.thunks";

const initialState: IExcursionsState = {
  loading: false,
  hasMore: true,
  noItems: false,
  items: [],
  totalItems: 0,
  filters: defaultSearchFilters,
  isDataFetched: false,
  scrollPosition: 0,
  regions: [],
  cities: [],
  placeTypes: [],
};

export const excursionsSlice = createSlice({
  name: "excursions",
  initialState,
  reducers: {
    setFilters: (state, { payload }: PayloadAction<IExcursionsFilters>) => {
      state.filters = payload;
    },
    setScrollPosition: (state, { payload }: PayloadAction<number>) => {
      state.scrollPosition = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResultsThunk.pending, (state, action) => {
      if (action.meta.arg.data.page === 0) {
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

    builder.addCase(getRegionsThunk.fulfilled, (state, action) => {
      state.regions = action.payload;
    });

    builder.addCase(getCitiesThunk.fulfilled, (state, action) => {
      state.cities = action.payload;
    });

    builder.addCase(getPlaceTypesThunk.fulfilled, (state, action) => {
      state.placeTypes = action.payload;
    });
  },
});

export const { setFilters, setScrollPosition } = excursionsSlice.actions;

export default excursionsSlice.reducer;
