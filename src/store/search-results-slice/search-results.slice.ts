import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { ISearchPlacesRequest } from "@/services/places-service/interfaces";
import placesService from "@/services/places-service/places.service";
import { IPagination } from "@/services/interfaces";

interface ISearchResultsState {
  error: boolean;
  loading: boolean;
  places: ISearchPlace[];
  pagination: IPagination;
}

const initialPagination: IPagination = {
  totalPages: 1,
  currentPage: 1,
  totalResults: 0,
};

const initialState: ISearchResultsState = {
  error: false,
  loading: true,
  places: [],
  pagination: initialPagination,
};

export const performSearchThunk = createAsyncThunk(
  "search-results/search-request",
  async (payload: ISearchPlacesRequest) => {
    const response = await placesService.search(payload);
    return response.data;
  }
);

export const searchResultsSlice = createSlice({
  name: "search-results",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.pagination.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(performSearchThunk.pending, (state, action) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(performSearchThunk.fulfilled, (state, action) => {
      state.places = action.payload.data;
      state.pagination = {
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
        currentPage: action.payload.currentPage,
      };
      state.loading = false;
    });
    builder.addCase(performSearchThunk.rejected, (state, action) => {
      state.places = [];
      state.error = true;
      state.loading = false;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
const selectSearchResultsState = createSelector(
  (state: RootState) => state,
  (s) => s.searchResults
);
export const selectPlaces = createSelector(
  selectSearchResultsState,
  (s) => s.places
);
export const selectLoading = createSelector(
  selectSearchResultsState,
  (s) => s.loading
);
export const selectPagination = createSelector(
  selectSearchResultsState,
  (s) => s.pagination
);
export const selectCurrentPage = createSelector(
  selectPagination,
  (s) => s.currentPage
);

export const { setCurrentPage } = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
