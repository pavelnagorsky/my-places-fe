import {
  ISearchForm,
  SearchModesEnum,
  SearchOrderByStringEnum,
} from "@/containers/places/logic/interfaces";

export const defaultSearchFilters: ISearchForm = {
  search: "",
  radius: 100,
  searchByMe: false,
  types: [],
  categories: [],
  locationStart: null,
  locationStartCoordinates: null,
  locationEnd: null,
  locationEndCoordinates: null,
  mode: SearchModesEnum.ONE_LOCATION,
  orderBy: SearchOrderByStringEnum.CREATED_AT,
};
