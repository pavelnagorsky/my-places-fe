import { IExcursionSearchItem } from "@/services/excursions-service/interfaces/excursion-search-item.interface";
import { IExcursionsFilters } from "@/containers/excursions/logic/interfaces";
import { IRegion } from "@/services/regions-service/interfaces/region.interface";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";

export interface IExcursionsState {
  hasMore: boolean;
  noItems: boolean;
  items: IExcursionSearchItem[];
  totalItems: number;
  filters: IExcursionsFilters;
  isDataFetched: boolean;
  scrollPosition: number;
  loading: boolean;
  regions: IRegion[];
  // filters options
  placeTypes: IPlaceType[];
}
