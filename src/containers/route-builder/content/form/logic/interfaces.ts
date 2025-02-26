import { IPlaceType } from "@/containers/search-page/content/filters/content/location-search/content/location-autocomplete/LocationAutocomplete";
import ISelectPlace from "@/services/places-service/interfaces/select-place.interface";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";

export interface IRouteBuilderForm {
  title: string;
  searchFrom: ISearchInput;
  searchTo: ISearchInput;
  addPlaces: ISelectPlace[];
  travelMode: TravelModesEnum;
}

interface ISearchInput {
  isSearchByMe: boolean;
  location: IPlaceType | { description: string } | null;
  coordinates: string | null;
}
