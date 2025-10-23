import { IExcursionsFilters } from "@/containers/excursions/excursions-catalog/logic/interfaces";
import { SearchExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";

export const defaultSearchFilters: IExcursionsFilters = {
  search: "",
  orderBy: `${SearchExcursionsOrderByEnum.CREATED_AT}`,
  travelModes: [],
  types: [],
  regions: [],
  placeTypeIds: [],
  cities: [],
  isPrimary: false,
};
