import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

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

export const selectHasRouteDirections = createSelector(
  selectRouteDirections,
  (s) => Boolean(s)
);

export const selectRouteDirectionsLoading = createSelector(
  selectState,
  (s) => s.directionsLoading
);

export const selectIsEditingMode = createSelector(
  selectState,
  (s) => typeof s.editRouteId === "number"
);

export const selectPlacesNearRoute = createSelector(
  selectState,
  (s) => s.placesNearRoute
);

export const selectRouteLastLeg = createSelector(
  selectRouteDirections,
  (directions) => {
    if (!directions) return null;
    const route = directions.routes[0];
    if (!route) return null;
    const lastRouteLeg = route.legs[route.legs.length - 1];
    const lastRouteLegDistance = (lastRouteLeg.distance?.value || 0) / 1000; // KM
    const lastRouteLegDuration = (lastRouteLeg.duration?.value || 0) / 60; // Minutes

    return { duration: lastRouteLegDuration, distance: lastRouteLegDistance };
  }
);
