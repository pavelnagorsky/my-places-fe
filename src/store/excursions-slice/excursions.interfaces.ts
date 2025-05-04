import { IExcursionSearchItem } from "@/services/excursions-service/interfaces/excursion-search-item.interface";
import { IExcursionsFilters } from "@/containers/excursions/logic/interfaces";

export interface IExcursionsState {
  hasMore: boolean;
  noItems: boolean;
  items: IExcursionSearchItem[];
  totalItems: number;
  filters: IExcursionsFilters;
  isDataFetched: boolean;
  scrollPosition: number;
  loading: boolean;
}
