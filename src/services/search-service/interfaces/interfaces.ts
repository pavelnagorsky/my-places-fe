import { IPaginationRequest } from "@/services/interfaces";
import { SearchOrderByEnum } from "@/services/places-service/interfaces/interfaces";

export interface ISearchPlacesRequest
  extends Omit<IPaginationRequest<SearchOrderByEnum>, "orderAsc"> {
  typesIds: number[];
  categoriesIds: number[];
  search: string;
  radius: number;
  searchStartCoordinates: string | null;
  searchEndCoordinates: string | null;
}

export interface ISearchPlacesOptionsRequest
  extends Omit<IPaginationRequest<SearchOrderByEnum>, "orderAsc"> {
  search: string;
  excludeIds?: number[];
}
