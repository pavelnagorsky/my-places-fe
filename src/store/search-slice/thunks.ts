import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";
import searchService from "@/services/search-service/search.service";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";
import placeTypesService from "@/services/place-types-service/place-types.service";

export const getSearchResultsThunk = createAsyncThunk(
  "search/get-places",
  async (payload: ISearchPlacesRequest & { language: string }, thunkAPI) => {
    const { data } = await searchService.search(payload.language, payload);
    return data;
  }
);

export const getMapResultsThunk = createAsyncThunk(
  "search/get-places-map",
  async (payload: ISearchPlacesRequest & { language: string }, thunkAPI) => {
    const { data } = await searchService.search(payload.language, {
      ...payload,
      page: 0,
      pageSize: 5000,
    });
    return data;
  }
);

export const getPlaceCategoriesThunk = createAsyncThunk(
  "search/get-place-categories",
  async (payload: { language: string }, thunkAPI) => {
    const { data } = await placeCategoriesService.getAll(payload.language);
    return data;
  }
);

export const getPlaceTypesThunk = createAsyncThunk(
  "search/get-place-types",
  async (payload: { language: string }, thunkAPI) => {
    const { data } = await placeTypesService.getAll(payload.language);
    return data;
  }
);
