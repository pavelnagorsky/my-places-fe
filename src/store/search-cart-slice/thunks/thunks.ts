import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import searchService from "@/services/search-service/search.service";
import localStorageFields from "@/shared/localStorageFields";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { setItems as setRouteItems } from "@/store/route-builder-slice/route-builder.slice";
import { setItems as setExcursionItems } from "@/store/excursion-builder-slice/excursion-builder.slice";

export const cartToExcursionBuilderThunk = createAsyncThunk(
  "search-cart/cart-to-excursion-builder",
  async (arg, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    const cartItems = rootState.searchCart.items.map((place) => ({
      ...place,
      duration: 0,
      distance: 0,
    }));

    thunkAPI.dispatch(setExcursionItems(cartItems));

    return;
  }
);

export const cartToRouteBuilderThunk = createAsyncThunk(
  "search-cart/cart-to-route-builder",
  async (arg, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    const cartItems = rootState.searchCart.items.map((place) => ({
      ...place,
      duration: 0,
      distance: 0,
    }));

    thunkAPI.dispatch(setRouteItems(cartItems));

    return;
  }
);

export const restoreCartFromLocalStorageThunk = createAsyncThunk(
  "search-cart/restore-from-cache",
  async (arg, thunkAPI) => {
    const data = localStorage.getItem(localStorageFields.SEARCH_CART);
    if (!data) return thunkAPI.rejectWithValue(null);

    const parsed: number[] = JSON.parse(data);

    if (!Array.isArray(parsed)) return thunkAPI.rejectWithValue(null);

    return parsed;
  }
);

export const saveCartToLocalStorageThunk = createAsyncThunk(
  "search-cart/cache",
  async (arg, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    const cartPlaceIds = rootState.searchCart.ids;
    localStorage.setItem(
      localStorageFields.SEARCH_CART,
      JSON.stringify(cartPlaceIds)
    );
    return null;
  }
);

export const getCartItemsThunk = createAsyncThunk(
  "search-cart/get-items",
  async (payload: { language: string }, thunkAPI) => {
    const rootState = thunkAPI.getState() as RootState;
    const ids = rootState.searchCart.ids;
    if (ids.length < 1) return [];
    const { data } = await searchService.searchByIds(ids, payload.language);
    return data;
  }
);

export const togglePlaceIdInCartThunk = createAsyncThunk(
  "search-cart/add-to-cart",
  async (
    payload: { placeId: number; addedMsg?: string; removedMsg?: string },
    thunkAPI
  ) => {
    const rootState = thunkAPI.getState() as RootState;
    const cartIds = rootState.searchCart.ids;
    if (cartIds.includes(payload.placeId)) {
      if (payload.removedMsg) {
        thunkAPI.dispatch(
          showAlertThunk({
            alertProps: {
              title: payload.removedMsg,
              variant: "standard",
              severity: "warning",
            },
            snackbarProps: {},
          })
        );
      }
      return { id: payload.placeId, action: "remove" };
    } else {
      if (payload.addedMsg) {
        thunkAPI.dispatch(
          showAlertThunk({
            alertProps: {
              title: payload.addedMsg,
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
      }
      return { id: payload.placeId, action: "add" };
    }
  }
);
