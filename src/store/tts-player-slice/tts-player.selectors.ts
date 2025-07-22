import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

const selectState = (state: RootState) => state.ttsPlayer;

export const selectTTSPlayerLoading = createSelector(
  selectState,
  (s) => s.loading
);

export const selectTTSPlayerOpen = createSelector(selectState, (s) => s.open);

export const selectTTSPlayerAudioUrl = createSelector(
  selectState,
  (s) => s.audioUrl
);

export const selectTTSPlayerText = createSelector(selectState, (s) => s.text);

export const selectTTSPlayerAutoPlayTrigger = createSelector(
  selectState,
  (s) => s.autoPlayTrigger
);
