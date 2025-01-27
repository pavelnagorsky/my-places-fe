import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import searchService from "@/services/search-service/search.service";
import routesService from "@/services/routes-service/routes.service";
import { ILatLngCoordinate } from "@/components/map/Map";
import googlePlacesAutocompleteService from "@/services/google-places-service/google-places.service";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import { ICreateRoute } from "@/services/routes-service/interfaces/create-route.interface";
import { IUpdateRoute } from "@/services/routes-service/interfaces/update-route.interface";

interface IRouteBuilderItem extends ISearchPlace {
  duration: number; // Minutes
  distance: number; // Km
}

interface IRouteBuilderState {
  items: IRouteBuilderItem[];
  distance: number; // km
  duration: number; // minutes
  submitLoading: boolean;
  directions: any | null;
  directionsLoading: boolean;
  editRouteId: number | null;
}

const initialState: IRouteBuilderState = {
  items: [],
  distance: 0,
  duration: 0,
  submitLoading: false,
  directions: null,
  directionsLoading: false,
  editRouteId: null,
};

export const startRouteEditingThunk = createAsyncThunk(
  "route-builder/start-editing",
  async (
    payload: {
      id: number;
      language: string;
      onSuccess?: (data: IRoute) => void;
      onError?: () => void;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await routesService.getRoute(
        payload.id,
        payload.language
      );
      const placesResponse = await searchService.searchByIds(
        data.places.map((place) => place.id),
        payload.language
      );

      const items = placesResponse.data.map((place, index) => ({
        ...place,
        duration: data.places[index]?.duration || 0,
        distance: data.places[index]?.distance || 0,
      }));

      if (typeof payload.onSuccess === "function") payload.onSuccess(data);

      return {
        items,
        duration: data.duration,
        distance: data.distance,
        id: data.id,
      };
    } catch (e) {
      console.log(e);
      if (typeof payload.onError === "function") payload.onError();
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const getRouteDirectionsThunk = createAsyncThunk(
  "route-builder/get-directions",
  async (
    payload: {
      language: string;
      startLatLng: ILatLngCoordinate;
      endLatLng: ILatLngCoordinate;
      optimizeWaypoints?: boolean;
    },
    thunkAPI
  ) => {
    const rootState = thunkAPI.getState() as RootState;
    const places = rootState.routeBuilder.items;

    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = places.map((place) => ({
      location: { lat: place.coordinates.lat, lng: place.coordinates.lng },
      stopover: true,
    }));
    return directionsService.route(
      {
        origin: payload.startLatLng,
        destination: payload.endLatLng,
        waypoints: waypoints,
        optimizeWaypoints: payload.optimizeWaypoints,
        language: payload.language,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && !!result) {
          const route = result.routes[0];
          const orderedWaypoints = route.waypoint_order.map(
            (index) => places[index]
          );
          thunkAPI.dispatch(setItems(orderedWaypoints));
          const distanceInMeters = route.legs.reduce(
            (prev, current) => prev + (current.distance?.value ?? 0),
            0
          );
          const durationInSeconds = route.legs.reduce(
            (prev, current) => prev + (current.duration?.value ?? 0),
            0
          );
          thunkAPI.dispatch(setDistance(distanceInMeters / 1000));
          thunkAPI.dispatch(setDuration(durationInSeconds / 60));

          return result;
        } else {
          console.error(`error fetching directions ${result}`);
          return thunkAPI.rejectWithValue(null);
        }
      }
    );
  }
);

export const saveRouteThunk = createAsyncThunk(
  "route-builder/save",
  async (
    payload: {
      route: {
        coordinatesStart: string;
        coordinatesEnd: string;
        title: string;
      };
      onSuccess?: () => void;
      onError?: () => void;
    },
    thunkAPI
  ) => {
    const { routeBuilder } = thunkAPI.getState() as RootState;
    const routeId = routeBuilder.editRouteId;
    try {
      const requestPayload: ICreateRoute | IUpdateRoute = {
        id: routeId as any,
        coordinatesStart: payload.route.coordinatesStart,
        coordinatesEnd: payload.route.coordinatesEnd,
        title: payload.route.title,
        placeIds: routeBuilder.items.map((item) => item.id),
      };

      const apiCall = !!routeId
        ? routesService.updateRoute
        : routesService.createRoute;

      const { data } = await apiCall(requestPayload);
      if (typeof payload.onSuccess === "function") payload.onSuccess();

      return data;
    } catch (e) {
      if (typeof payload.onError === "function") payload.onError();
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const addRouteItemsThunk = createAsyncThunk(
  "route-builder/add-items",
  async (payload: { ids: number[]; language: string }) => {
    const { data } = await searchService.searchByIds(
      payload.ids,
      payload.language
    );
    return data.map((place) => ({ ...place, duration: 0, distance: 0 }));
  }
);

const routeBuilderSlice = createSlice({
  name: "route-builder",
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<IRouteBuilderItem[]>) => {
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
    builder.addCase(addRouteItemsThunk.fulfilled, (state, { payload }) => {
      state.items = [...state.items, ...payload];
    });

    builder.addCase(saveRouteThunk.pending, (state, action) => {
      state.submitLoading = true;
    });
    builder.addCase(saveRouteThunk.rejected, (state, action) => {
      state.submitLoading = false;
    });
    builder.addCase(saveRouteThunk.fulfilled, (state, { payload }) => {
      state.submitLoading = false;
    });

    builder.addCase(getRouteDirectionsThunk.pending, (state, action) => {
      state.directionsLoading = true;
    });
    builder.addCase(getRouteDirectionsThunk.rejected, (state, action) => {
      state.directions = null;
      state.directionsLoading = false;
    });
    builder.addCase(getRouteDirectionsThunk.fulfilled, (state, { payload }) => {
      state.directions = payload;
      state.directionsLoading = false;
    });

    builder.addCase(startRouteEditingThunk.rejected, (state, action) => {
      state.editRouteId = null;
    });
    builder.addCase(startRouteEditingThunk.fulfilled, (state, { payload }) => {
      state.editRouteId = payload.id;
      state.items = payload.items;
      state.distance = payload.distance;
      state.duration = payload.duration;
    });
  },
});

const selectState = (state: RootState) => state.routeBuilder;

export const selectItems = createSelector(selectState, (s) => s.items);

export const selectHasItems = createSelector(selectItems, (s) => s.length > 0);

export const selectDuration = createSelector(selectState, (s) => s.duration);

export const selectDistance = createSelector(selectState, (s) => s.distance);

export const selectSubmitLoading = createSelector(
  selectState,
  (s) => s.submitLoading
);

export const selectRouteDirections = createSelector(
  selectState,
  (s) => s.directions
);

export const selectRouteDirectionsLoading = createSelector(
  selectState,
  (s) => s.directionsLoading
);

export const selectIsEditingMode = createSelector(
  selectState,
  (s) => typeof s.editRouteId === "number"
);

export const {
  setItems,
  resetState,
  sortItems,
  removeItem,
  setDuration,
  setDistance,
} = routeBuilderSlice.actions;

export default routeBuilderSlice.reducer;
