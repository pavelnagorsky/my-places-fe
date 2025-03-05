import { createAsyncThunk } from "@reduxjs/toolkit";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { RootState } from "@/store/store";
import { ICreateRoute } from "@/services/routes-service/interfaces/create-route.interface";
import { IUpdateRoute } from "@/services/routes-service/interfaces/update-route.interface";
import routesService from "@/services/routes-service/routes.service";
import searchService from "@/services/search-service/search.service";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import { ILatLngCoordinate } from "@/components/map/Map";
import {
  setDistance,
  setDuration,
  setItems,
} from "@/store/route-builder-slice/route-builder.slice";

export const startExcursionEditingThunk = createAsyncThunk(
  "excursion-builder/start-editing",
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

export const getExcursionDirectionsThunk = createAsyncThunk(
  "excursion-builder/get-directions",
  async (
    payload: {
      language: string;
      optimizeWaypoints?: boolean;
      travelMode: TravelModesEnum;
      onReorder?: (reorderedIds: number[]) => void;
    },
    thunkAPI
  ) => {
    const rootState = thunkAPI.getState() as RootState;
    const places = rootState.excursionBuilder.items;

    if (places.length < 2) return thunkAPI.rejectWithValue(null);

    const directionsService = new window.google.maps.DirectionsService();
    const waypoints = places.map((place) => ({
      location: { lat: place.coordinates.lat, lng: place.coordinates.lng },
      stopover: true,
    }));
    // Set the origin to the first waypoint
    const origin = waypoints[0].location;

    // Set the destination to the last waypoint
    const destination = waypoints[waypoints.length - 1].location;

    // Exclude the first and last items from the waypoints array
    const intermediateWaypoints = waypoints.slice(1, waypoints.length - 1);
    const waypointPlaces = places.slice(1, places.length - 1);
    return directionsService.route(
      {
        origin,
        destination,
        waypoints: intermediateWaypoints,
        optimizeWaypoints: payload.optimizeWaypoints,
        language: payload.language,
        travelMode: payload.travelMode as any,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && !!result) {
          const route = result.routes[0];
          const firstPlace = { ...places[0], distance: 0, duration: 0 };
          const lastPlace = {
            ...places[places.length - 1],
            distance:
              (route.legs[route.legs.length - 1]?.distance?.value || 0) / 1000,
            duration:
              (route.legs[route.legs.length - 1]?.duration?.value || 0) / 60,
          };
          const orderedWaypoints = route.waypoint_order.map((index) => ({
            ...waypointPlaces[index],
            distance: (route.legs[index]?.distance?.value || 0) / 1000,
            duration: (route.legs[index]?.duration?.value || 0) / 60,
          }));
          const distanceInMeters = route.legs.reduce(
            (prev, current) => prev + (current.distance?.value ?? 0),
            0
          );
          const durationInSeconds = route.legs.reduce(
            (prev, current) => prev + (current.duration?.value ?? 0),
            0
          );
          const updateItems = [firstPlace, ...orderedWaypoints, lastPlace];
          if (typeof payload.onReorder === "function") {
            payload.onReorder(updateItems.map((item) => item.id));
          }
          thunkAPI.dispatch(setItems(updateItems));
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

export const saveExcursionThunk = createAsyncThunk(
  "excursion-builder/save",
  async (
    payload: {
      route: {
        coordinatesStart: string;
        coordinatesEnd: string;
        title: string;
        travelMode: TravelModesEnum;
      };
      onSuccess?: () => void;
      onError?: () => void;
    },
    thunkAPI
  ) => {
    const { excursionBuilder } = thunkAPI.getState() as RootState;
    const id = excursionBuilder.editExcursionId;
    try {
      const requestPayload: ICreateRoute | IUpdateRoute = {
        id: id as any,
        coordinatesStart: payload.route.coordinatesStart,
        coordinatesEnd: payload.route.coordinatesEnd,
        title: payload.route.title,
        placeIds: excursionBuilder.items.map((item) => item.id),
        travelMode: payload.route.travelMode,
      };

      const apiCall = !!id
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

export const addExcursionItemsThunk = createAsyncThunk(
  "excursion-builder/add-items",
  async (payload: { ids: number[]; language: string }) => {
    const { data } = await searchService.searchByIds(
      payload.ids,
      payload.language
    );
    return data.map((place) => ({ ...place, duration: 0, distance: 0 }));
  }
);
