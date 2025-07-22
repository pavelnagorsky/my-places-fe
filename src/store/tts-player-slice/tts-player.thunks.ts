import { createAsyncThunk } from "@reduxjs/toolkit";
import speechKitService from "@/services/speech-kit-service/speech-kit.service";
import { ITTSRequest } from "@/services/speech-kit-service/interfaces/tts-request.interface";
import { setTTSPlayerAutoPlayTrigger } from "@/store/tts-player-slice/tts-player.slice";

export const loadTTSAudioThunk = createAsyncThunk(
  "tts-player/load-audio",
  async (
    payload: {
      data: ITTSRequest;
      onSuccess?: () => void;
      onError?: (e: any) => void;
    },
    thunkAPI
  ) => {
    try {
      const response = await speechKitService.synthesizeSpeech(payload.data);
      const url = URL.createObjectURL(response.data);
      if (typeof payload.onSuccess === "function") payload.onSuccess();
      return { url, text: payload.data.text };
    } catch (e: any) {
      if (typeof payload.onError === "function") payload.onError(e);
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const triggerTTSPlayerAutoPlayThunk = createAsyncThunk(
  "tts-player/trigger-auto-play",
  async (arg, thunkAPI) => {
    setTimeout(() => {
      thunkAPI.dispatch(setTTSPlayerAutoPlayTrigger(false));
    }, 100);
    thunkAPI.dispatch(setTTSPlayerAutoPlayTrigger(true));
    return null;
  }
);
