import { IPaginationRequest } from "@/services/interfaces";
import { SearchOrderByEnum } from "@/services/places-service/interfaces/interfaces";

export interface ISearchPlacesRequest
  extends Omit<IPaginationRequest<SearchOrderByEnum>, "orderAsc"> {
  typesIds: number[];
  categoriesIds: number[];
  title: string;
  description: string;
  radius: number;
  searchStartCoordinates: string | null;
  searchEndCoordinates: string | null;
}
