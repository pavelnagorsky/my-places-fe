import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISearchForm } from "@/containers/search-page/interfaces";
import { defaultSearchFilters } from "@/containers/search-page/usePlacesSearch";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";
import searchService from "@/services/search-service/search.service";

export const getSearchResultsThunk = createAsyncThunk(
  "search/get-places",
  async (payload: ISearchPlacesRequest & { language: string }, thunkAPI) => {
    const { data } = await searchService.search(payload.language, payload);
    return data;
  }
);

export const getMapResultsThunk = createAsyncThunk(
  "search/get-places-map",
  async (payload: ISearchPlacesRequest & { language: string }, thunkAPI) => {
    const { data } = await searchService.search(payload.language, {
      ...payload,
      page: 0,
      pageSize: 5000,
    });
    return data;
  }
);

interface ISearchState {
  hasMore: boolean;
  noItems: boolean;
  items: ISearchPlace[];
  totalItems: number;
  filters: ISearchForm;
  isDataFetched: boolean;
  mapResults: ISearchPlace[];
  scrollPosition: number;
}

const initialState: ISearchState = {
  hasMore: true,
  noItems: false,
  items: [],
  totalItems: 0,
  filters: defaultSearchFilters,
  isDataFetched: false,
  mapResults: [],
  scrollPosition: 0,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
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
        state.items = [];
      }
      state.hasMore = true;
      state.noItems = false;
      state.isDataFetched = true;
    });
    builder.addCase(getSearchResultsThunk.fulfilled, (state, { payload }) => {
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
      state.noItems = state.items.length === 0;
      state.hasMore = false;
    });

    builder.addCase(getMapResultsThunk.fulfilled, (state, { payload }) => {
      state.mapResults = payload.items;
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

export const { setFilters, setScrollPosition } = searchSlice.actions;

export default searchSlice.reducer;
