import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { SearchExcursionsOrderByEnum } from "@/services/excursions-service/enums/enums";
import { IRegion } from "@/services/regions-service/interfaces/region.interface";
import { ICity } from "@/services/cities-service/interfaces/city.interface";

export interface IExcursionsFilters {
  search: string;
  types: ExcursionTypesEnum[];
  travelModes: TravelModesEnum[];
  orderBy: `${SearchExcursionsOrderByEnum}`;
  regions: IRegion[];
  cities: ICity[];
  placeTypeIds: number[];
  isPrimary: boolean;
}
