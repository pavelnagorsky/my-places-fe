import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import {
  addExcursionItemsThunk,
  getExcursionDirectionsThunk,
  saveExcursionThunk,
  startExcursionEditingThunk,
} from "@/store/excursion-builder-slice/thunks";
import { ILatLngCoordinate } from "@/components/map/Map";

export interface IExcursionBuilderItem {
  // Place id
  id: number;
  // Place url path
  slug: string;
  // Place title
  title: string;
  // Place address
  address: string;
  // Place coordinates {lat;lng}
  coordinates: ILatLngCoordinate;
  duration: number; // Minutes
  distance: number; // Km
  excursionDescription: string;
  excursionDuration: number; // Minutes
}

interface IExcursionBuilderState {
  items: IExcursionBuilderItem[];
  distance: number; // km
  duration: number; // minutes
  submitLoading: boolean;
  directions: any | null;
  directionsLoading: boolean;
  editExcursionId: number | null;
}

const initialState: IExcursionBuilderState = {
  items: [],
  distance: 0,
  duration: 0,
  submitLoading: false,
  directions: null,
  directionsLoading: false,
  editExcursionId: null,
};

const excursionBuilderSlice = createSlice({
  name: "excursion-builder",
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<IExcursionBuilderItem[]>) => {
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
    updateItemExcursionDescription: (
      state,
      { payload }: PayloadAction<{ id: number; value: string }>
    ) => {
      const itemIndex = state.items.findIndex((item) => item.id === payload.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].excursionDescription = payload.value;
      }
    },
    updateItemExcursionDuration: (
      state,
      { payload }: PayloadAction<{ id: number; value: number }>
    ) => {
      const itemIndex = state.items.findIndex((item) => item.id === payload.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].excursionDuration = payload.value;
      }
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
    builder.addCase(addExcursionItemsThunk.fulfilled, (state, { payload }) => {
      state.items = [...state.items, ...payload];
    });

    builder.addCase(saveExcursionThunk.pending, (state, action) => {
      state.submitLoading = true;
    });
    builder.addCase(saveExcursionThunk.rejected, (state, action) => {
      state.submitLoading = false;
    });
    builder.addCase(saveExcursionThunk.fulfilled, (state, { payload }) => {
      state.submitLoading = false;
    });

    builder.addCase(getExcursionDirectionsThunk.pending, (state, action) => {
      state.directionsLoading = true;
    });
    builder.addCase(getExcursionDirectionsThunk.rejected, (state, action) => {
      state.directions = null;
      state.directionsLoading = false;
    });
    builder.addCase(
      getExcursionDirectionsThunk.fulfilled,
      (state, { payload }) => {
        state.directions = payload;
        state.directionsLoading = false;
      }
    );

    builder.addCase(startExcursionEditingThunk.rejected, (state, action) => {
      state.editExcursionId = null;
    });
    builder.addCase(
      startExcursionEditingThunk.fulfilled,
      (state, { payload }) => {
        state.editExcursionId = payload.id;
        state.items = payload.items;
        state.distance = payload.distance;
        state.duration = payload.duration;
      }
    );
  },
});

const selectState = (state: RootState) => state.excursionBuilder;

export const selectItems = createSelector(selectState, (s) => s.items);

export const selectItemsLength = createSelector(selectItems, (s) => s.length);

export const selectHasItems = createSelector(selectItems, (s) => s.length > 0);

export const selectDuration = createSelector(selectState, (s) => s.duration);

export const selectDistance = createSelector(selectState, (s) => s.distance);

export const selectSubmitLoading = createSelector(
  selectState,
  (s) => s.submitLoading
);

export const selectExcursionDirections = createSelector(
  selectState,
  (s) => s.directions
);

export const selectHasExcursionDirections = createSelector(
  selectExcursionDirections,
  (s) => Boolean(s)
);

export const selectExcursionDirectionsLoading = createSelector(
  selectState,
  (s) => s.directionsLoading
);

export const selectIsEditingMode = createSelector(
  selectState,
  (s) => typeof s.editExcursionId === "number"
);

export const {
  setItems,
  resetState,
  sortItems,
  removeItem,
  setDuration,
  updateItemExcursionDuration,
  updateItemExcursionDescription,
  setDistance,
} = excursionBuilderSlice.actions;

export default excursionBuilderSlice.reducer;
