import { IPlaceType } from "@/containers/search-page/content/filters/content/location-search/content/location-autocomplete/LocationAutocomplete";
import ISelectPlace from "@/services/places-service/interfaces/select-place.interface";

export interface IRouteBuilderForm {
  title: string;
  searchFrom: ISearchInput;
  searchTo: ISearchInput;
  addPlace: ISelectPlace | null;
}

interface ISearchInput {
  isSearchByMe: boolean;
  location: IPlaceType | null;
  coordinates: string | null;
}
