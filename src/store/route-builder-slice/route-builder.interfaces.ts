import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";

export interface IRouteBuilderItem extends ISearchPlace {
  duration: number; // Minutes
  distance: number; // Km
}

interface IRouteLastLeg {}

export interface IRouteBuilderState {
  items: IRouteBuilderItem[];
  distance: number; // km
  duration: number; // minutes
  submitLoading: boolean;
  directions: any | null;
  directionsLoading: boolean;
  editRouteId: number | null;
  placesNearRoute: ISearchPlace[];
}
