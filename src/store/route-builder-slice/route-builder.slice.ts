import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addRouteItemsThunk,
  getPlacesNearRouteThunk,
  getRouteDirectionsThunk,
  saveRouteThunk,
  startRouteEditingThunk,
} from "@/store/route-builder-slice/route-builder.thunks";
import {
  IRouteBuilderItem,
  IRouteBuilderState,
} from "@/store/route-builder-slice/route-builder.interfaces";

const initialState: IRouteBuilderState = {
  items: [],
  distance: 0,
  duration: 0,
  submitLoading: false,
  directions: null,
  directionsLoading: false,
  editRouteId: null,
  placesNearRoute: [],
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

    builder.addCase(getPlacesNearRouteThunk.fulfilled, (state, { payload }) => {
      state.placesNearRoute = payload.data.items;
    });
  },
});

export const {
  setItems,
  resetState,
  sortItems,
  removeItem,
  setDuration,
  setDistance,
} = routeBuilderSlice.actions;

export default routeBuilderSlice.reducer;
