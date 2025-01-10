import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";

import {
  getCartItemsThunk,
  restoreCartFromLocalStorageThunk,
  togglePlaceIdInCartThunk,
} from "@/store/search-cart-slice/thunks/thunks";

interface ISearchCartState {
  open: boolean;
  items: ISearchPlace[];
  ids: number[];
  loading: boolean;
}

const initialState: ISearchCartState = {
  open: false,
  items: [],
  ids: [],
  loading: false,
};

const searchCartSlice = createSlice({
  name: "search-cart",
  initialState,
  reducers: {
    setCartOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.open = payload;
    },
    removeCartItem: (state, { payload }: PayloadAction<number>) => {
      state.ids = state.ids.filter((id) => id !== payload);
      state.items = state.items.filter((item) => item.id !== payload);
    },
    sortItems: (
      state,
      action: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = action.payload;
      const [removedItem] = state.items.splice(oldIndex, 1);
      state.items.splice(newIndex, 0, removedItem);
      const [removedId] = state.ids.splice(oldIndex, 1);
      state.ids.splice(newIndex, 0, removedId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      togglePlaceIdInCartThunk.fulfilled,
      (state, { payload }) => {
        if (payload.action === "remove") {
          state.ids = state.ids.filter((id) => id !== payload.id);
        }
        if (payload.action === "add") {
          state.ids = [...state.ids, payload.id];
        }
      }
    );

    builder.addCase(getCartItemsThunk.pending, (state) => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(getCartItemsThunk.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.loading = false;
    });
    builder.addCase(getCartItemsThunk.rejected, (state, { payload }) => {
      state.items = [];
      state.loading = false;
    });

    builder.addCase(
      restoreCartFromLocalStorageThunk.fulfilled,
      (state, { payload }) => {
        state.ids = payload;
      }
    );
  },
});

// Other code such as selectors can use the imported `RootState` type
const selectState = createSelector(
  (state: RootState) => state,
  (s) => s.searchCart
);

export const selectIsOpen = createSelector(selectState, (s) => s.open);

export const selectItems = createSelector(selectState, (s) => s.items);

export const selectLoading = createSelector(selectState, (s) => s.loading);

export const selectCartPlaceIds = createSelector(selectState, (s) => s.ids);

export const selectCartHasPlaceIds = createSelector(
  selectCartPlaceIds,
  (s) => s.length > 0
);

export const selectCartPlaceIdsLength = createSelector(
  selectCartPlaceIds,
  (s) => s.length
);

export const { setCartOpen, removeCartItem, sortItems } =
  searchCartSlice.actions;

export default searchCartSlice.reducer;
