import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import {
  addRouteItemsThunk,
  getRouteDirectionsThunk,
  saveRouteThunk,
  startRouteEditingThunk,
} from "@/store/route-builder-slice/thunks";

interface IRouteBuilderItem extends ISearchPlace {
  duration: number; // Minutes
  distance: number; // Km
}

interface IRouteBuilderState {
  items: IRouteBuilderItem[];
  distance: number; // km
  duration: number; // minutes
  submitLoading: boolean;
  directions: any | null;
  directionsLoading: boolean;
  editRouteId: number | null;
}

const initialState: IRouteBuilderState = {
  items: [],
  distance: 0,
  duration: 0,
  submitLoading: false,
  directions: null,
  directionsLoading: false,
  editRouteId: null,
};

const routeBuilderSlice = createSlice({
  name: "route-builder",
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<IRouteBuilderItem[]>) => {
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
    builder.addCase(addRouteItemsThunk.fulfilled, (state, { payload }) => {
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

    builder.addCase(getRouteDirectionsThunk.pending, (state, action) => {
      state.directionsLoading = true;
    });
    builder.addCase(getRouteDirectionsThunk.rejected, (state, action) => {
      state.directions = null;
      state.directionsLoading = false;
    });
    builder.addCase(getRouteDirectionsThunk.fulfilled, (state, { payload }) => {
      state.directions = payload;
      state.directionsLoading = false;
    });

    builder.addCase(startRouteEditingThunk.rejected, (state, action) => {
      state.editRouteId = null;
    });
    builder.addCase(startRouteEditingThunk.fulfilled, (state, { payload }) => {
      if (payload.mode === "update") state.editRouteId = payload.id;
      state.items = payload.items;
      state.distance = payload.distance;
      state.duration = payload.duration;
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

export const selectRouteDirections = createSelector(
  selectState,
  (s) => s.directions
);

export const selectHasRouteDirections = createSelector(
  selectRouteDirections,
  (s) => Boolean(s)
);

export const selectRouteDirectionsLoading = createSelector(
  selectState,
  (s) => s.directionsLoading
);

export const selectIsEditingMode = createSelector(
  selectState,
  (s) => typeof s.editRouteId === "number"
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
