import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearchExcursionsRequest } from "@/services/excursions-service/interfaces/interfaces";
import excursionsService from "@/services/excursions-service/excursions.service";

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
