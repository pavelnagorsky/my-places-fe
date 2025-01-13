import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import searchService from "@/services/search-service/search.service";

interface IRouteBuilderState {
  items: ISearchPlace[];
}

const initialState: IRouteBuilderState = {
  items: [],
};

export const addRouteItemThunk = createAsyncThunk(
  "route-builder/add-item",
  async (payload: { id: number; language: string }) => {
    const { data } = await searchService.searchByIds(
      [payload.id],
      payload.language
    );
    return data;
  }
);

const routeBuilderSlice = createSlice({
  name: "route-builder",
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<ISearchPlace[]>) => {
      state.items = payload;
    },
    resetState: () => initialState,
    removeItem: (state, { payload }: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== payload);
    },
    sortItems: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removedItem] = state.items.splice(oldIndex, 1);
      state.items.splice(newIndex, 0, removedItem);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRouteItemThunk.fulfilled, (state, { payload }) => {
      state.items = [...state.items, ...payload];
    });
  },
});

const selectState = (state: RootState) => state.routeBuilder;

export const selectItems = createSelector(selectState, (s) => s.items);

export const { setItems, resetState, sortItems, removeItem } =
  routeBuilderSlice.actions;

export default routeBuilderSlice.reducer;
