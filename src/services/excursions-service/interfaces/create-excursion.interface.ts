import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";

export interface ICreateExcursion {
  title: string;
  description: string;
  places: { id: number; description: string; excursionDuration: number }[];
  travelMode: TravelModesEnum;
  type: ExcursionTypesEnum;
  regionId: number | null;
  cityId: number | null;
}
