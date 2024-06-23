import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ISearchForm } from "@/containers/search-page/interfaces";
import { defaultSearchFilters } from "@/containers/search-page/usePlacesSearch";

interface ISearchState {
  currentPage: number;
  filters: ISearchForm;
}

const initialState: ISearchState = {
  currentPage: 0,
  filters: defaultSearchFilters,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setFilters: (state, { payload }: PayloadAction<ISearchForm>) => {
      state.filters = payload;
    },
    setCurrentPage: (state, { payload }: PayloadAction<number>) => {
      state.currentPage = payload;
    },
  },
});

// Other code such as selectors can use the imported `RootState` type
const selectSearchState = createSelector(
  (state: RootState) => state,
  (s) => s.search
);
export const selectCurrentSearchPage = createSelector(
  selectSearchState,
  (s) => s.currentPage
);
export const selectSearchFilters = createSelector(
  selectSearchState,
  (s) => s.filters
);

export const { setFilters, setCurrentPage } = searchSlice.actions;

export default searchSlice.reducer;
