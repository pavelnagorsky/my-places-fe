import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import searchService from "@/services/search-service/search.service";
import routesService from "@/services/routes-service/routes.service";

interface IRouteBuilderState {
  items: ISearchPlace[];
  distance: number; // km
  duration: number; // minutes
  submitLoading: boolean;
}

const initialState: IRouteBuilderState = {
  items: [],
  distance: 0,
  duration: 0,
  submitLoading: false,
};

export const saveRouteThunk = createAsyncThunk(
  "route-builder/save",
  async (
    payload: {
      coordinatesStart: string;
      coordinatesEnd: string;
      title: string;
    },
    thunkAPI
  ) => {
    const { routeBuilder } = thunkAPI.getState() as RootState;
    const { data } = await routesService.createRoute({
      coordinatesStart: payload.coordinatesStart,
      coordinatesEnd: payload.coordinatesEnd,
      title: payload.title,
      distance: routeBuilder.distance,
      duration: routeBuilder.duration,
      placeIds: routeBuilder.items.map((item) => item.id),
    });
    return data;
  }
);

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
    setDuration: (state, { payload }: PayloadAction<number>) => {
      state.duration = payload;
    },
    setDistance: (state, { payload }: PayloadAction<number>) => {
      state.distance = payload;
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

    builder.addCase(saveRouteThunk.pending, (state, action) => {
      state.submitLoading = true;
    });
    builder.addCase(saveRouteThunk.rejected, (state, action) => {
      state.submitLoading = false;
    });
    builder.addCase(saveRouteThunk.fulfilled, (state, { payload }) => {
      state.submitLoading = false;
    });
  },
});

const selectState = (state: RootState) => state.routeBuilder;

export const selectItems = createSelector(selectState, (s) => s.items);

export const selectHasItems = createSelector(selectItems, (s) => s.length > 0);

export const selectDuration = createSelector(selectState, (s) => s.duration);

export const selectDistance = createSelector(selectState, (s) => s.distance);

export const selectSubmitLoading = createSelector(
  selectState,
  (s) => s.submitLoading
);

export const {
  setItems,
  resetState,
  sortItems,
  removeItem,
  setDuration,
  setDistance,
} = routeBuilderSlice.actions;

export default routeBuilderSlice.reducer;
