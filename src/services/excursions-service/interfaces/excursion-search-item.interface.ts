import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";

export interface IExcursionSearchItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: number;
  distance: number;
  placesCount: number;
  images: string[];
  createdAt: string;
  type: ExcursionTypesEnum;
  travelMode: TravelModesEnum;
  viewsCount: number;
}
