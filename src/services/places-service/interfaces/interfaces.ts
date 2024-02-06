import { ISearchPlace } from "@/services/places-service/interfaces/search-place.interface";
import { IPagination } from "@/services/interfaces";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { PlaceStatusesEnum } from "./place-statuses.enum";
import { IModerationPlace } from "@/services/places-service/interfaces/moderation-place.interface";

export interface ISearchPlacesRequest {
  language?: string;
  typesIds: number[];
  categoriesIds: number[];
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

export interface IMyPlacesRequest {
  lastIndex: number;
  itemsPerPage: number;
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses?: PlaceStatusesEnum[];
  orderBy?: MyPlacesOrderByEnum;
  orderAsc?: boolean;
}

export interface IMyPlacesResponse {
  data: IMyPlace[];
  lastIndex: number;
  hasMore: boolean;
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

export interface IModerationPlacesRequest {
  lastIndex: number;
  itemsPerPage: number;
  authorEmail?: string;
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  orderBy?: ModerationPlacesOrderByEnum;
  orderAsc?: boolean;
}

export interface IModerationPlacesResponse {
  data: IModerationPlace[];
  lastIndex: number;
  hasMore: boolean;
}
