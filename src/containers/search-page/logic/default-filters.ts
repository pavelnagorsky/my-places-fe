import {
  ISearchForm,
  SearchModesEnum,
  SearchOrderByStringEnum,
} from "@/containers/search-page/logic/interfaces";

export const defaultSearchFilters: ISearchForm = {
  title: "",
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
