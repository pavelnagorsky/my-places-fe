import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearchExcursionsRequest } from "@/services/excursions-service/interfaces/interfaces";
import excursionsService from "@/services/excursions-service/excursions.service";
import regionsService from "@/services/regions-service/regions.service";

export const getSearchResultsThunk = createAsyncThunk(
  "excursions/get-items",
  async (
    payload: { language: string; data: ISearchExcursionsRequest },
    thunkAPI
  ) => {
    const { data } = await excursionsService.searchExcursions(
      payload.data,
      payload.language
    );
    return data;
  }
);

export const getRegionsThunk = createAsyncThunk(
  "excursions/get-regions",
  async (payload: { language: string }, thunkAPI) => {
    const { data } = await regionsService.getAll(payload.language);
    return data;
  }
);
