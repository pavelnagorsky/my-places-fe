import { IPlaceType } from "@/containers/search-page/filters/content/location-search/content/location-autocomplete/LocationAutocomplete";

export interface ISearchForm {
  categories: number[];
  types: number[];
  title: string;
  radius: number;
  searchByMe: boolean;
  locationStart: IPlaceType | null;
  locationStartCoordinates: string | null;
  locationEnd: IPlaceType | null;
  locationEndCoordinates: string | null;
  showMap: boolean;
  mode: SearchModesEnum;
  orderBy: SearchOrderByStringEnum;
}

export enum SearchModesEnum {
  ONE_LOCATION = "0",
  ROUTE = "1",
}

export enum SearchOrderByStringEnum {
  CREATED_AT = "0",
  RATING = "1",
  TITLE = "2",
}
