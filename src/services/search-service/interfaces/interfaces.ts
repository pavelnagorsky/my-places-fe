import { IPaginationRequest } from "@/services/interfaces";
import { SearchPlacesOrderByEnum } from "@/services/places-service/interfaces/interfaces";
import { ILatLngCoordinate } from "@/components/map/Map";

export interface ISearchPlacesRequest
  extends Omit<IPaginationRequest<SearchPlacesOrderByEnum>, "orderAsc"> {
  typesIds: number[];
  categoriesIds: number[];
  search: string;
  radius: number;
  searchStartCoordinates: string | null;
  searchEndCoordinates: string | null;
}

export interface ISearchPlacesOptionsRequest
  extends Omit<IPaginationRequest<SearchPlacesOrderByEnum>, "orderAsc"> {
  search: string;
  excludeIds?: number[];
}

export interface ISearchPlacesNearRouteRequest
  extends Omit<IPaginationRequest<SearchPlacesOrderByEnum>, "orderAsc"> {
  radius: number;
  coordinates: ILatLngCoordinate[];
  excludeIds?: number[];
}
