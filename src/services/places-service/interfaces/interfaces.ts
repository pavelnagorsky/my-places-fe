import { IPaginationRequest } from "@/services/interfaces";
import { PlaceStatusesEnum } from "./place-statuses.enum";

export interface ISearchPlacesRequest
  extends Omit<IPaginationRequest, "orderBy" | "orderAsc"> {
  typesIds: number[];
  categoriesIds: number[];
  title: string;
  radius: number;
  searchCoordinates: string | null;
}

export interface IMyPlacesRequest
  extends IPaginationRequest<MyPlacesOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses?: PlaceStatusesEnum[];
}

export enum MyPlacesOrderByEnum {
  CREATED_AT = 0,
  TITLE = 1,
  TYPE = 2,
  STATUS = 3,
  COMMERCIAL = 4,
}

export interface IMyFavouritesRequest {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}

export enum ModerationPlacesOrderByEnum {
  CREATED_AT,
  UPDATED_AT,
  TITLE,
  TYPE,
  COMMERCIAL,
  AUTHOR,
}

export interface IModerationPlacesRequest
  extends IPaginationRequest<ModerationPlacesOrderByEnum> {
  authorEmail?: string;
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}
