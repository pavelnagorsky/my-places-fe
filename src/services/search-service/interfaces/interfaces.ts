import { IPaginationRequest } from "@/services/interfaces";

export interface ISearchPlacesRequest
  extends Omit<IPaginationRequest, "orderBy" | "orderAsc"> {
  typesIds: number[];
  categoriesIds: number[];
  title: string;
  radius: number;
  searchCoordinates: string | null;
}