import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { IPagination } from "@/services/interfaces";

export interface ISearchPlacesRequest {
  language?: string;
  typesIds: number[];
  title: string;
  radius: number;
  searchCoordinates: string | null;
  // pagination
  pageToReturn: number;
  itemsPerPage: number;
}

export interface ISearchPlacesResponse extends IPagination {
  data: ISearchPlace[];
}
