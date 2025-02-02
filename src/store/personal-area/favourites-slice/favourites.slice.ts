import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

interface IFavouritesState {
  actualPlaceIds: number[];
}

const initialState: IFavouritesState = {
  actualPlaceIds: [],
};

const favouritesSlice = createSlice({
  name: "personal-area/favourites",
  initialState,
  reducers: {
    setActualPlaceIds: (state, { payload }: PayloadAction<number[]>) => {
      state.actualPlaceIds = payload;
    },
    toggleActualPlaceId: (
      state,
      { payload }: PayloadAction<{ id: number; add: boolean }>
    ) => {
      if (payload.add) {
        state.actualPlaceIds.push(payload.id);
      } else {
        state.actualPlaceIds = state.actualPlaceIds.filter(
          (id) => id !== payload.id
        );
      }
    },
    resetState: () => initialState,
  },
});

export const { setActualPlaceIds, toggleActualPlaceId, resetState } =
  favouritesSlice.actions;

const selectState = (state: RootState) => state.favourites;

export const selectActualPlaceIds = createSelector(
  selectState,
  (s) => s.actualPlaceIds
);

export default favouritesSlice.reducer;
