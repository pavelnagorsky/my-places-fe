import { ITTSPlayerState } from "@/store/tts-player-slice/tts-player.interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadTTSAudioThunk } from "@/store/tts-player-slice/tts-player.thunks";

const initialState: ITTSPlayerState = {
  open: false,
  audioUrl: null,
  loading: false,
  text: null,
  autoPlayTrigger: false,
};

export const ttsPlayerSlice = createSlice({
  name: "tts-player",
  initialState,
  reducers: {
    setTTSPlayerOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setTTSPlayerAutoPlayTrigger: (state, action: PayloadAction<boolean>) => {
      state.autoPlayTrigger = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTTSAudioThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loadTTSAudioThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.audioUrl = action.payload.url;
      state.text = action.payload.text;
    });
    builder.addCase(loadTTSAudioThunk.rejected, (state, action) => {
      state.loading = false;
      state.open = false;
    });
  },
});

export const { setTTSPlayerOpen, setTTSPlayerAutoPlayTrigger } =
  ttsPlayerSlice.actions;

export default ttsPlayerSlice.reducer;
