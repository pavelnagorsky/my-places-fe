import { ExcursionTypesEnum } from "@/services/excursions-service/interfaces/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { IExcursionPlace } from "@/services/excursions-service/interfaces/excursion-place.interface";

export interface IExcursion {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: number;
  excursionDuration: number;
  distance: number;
  places: IExcursionPlace[];
  createdAt: string;
  updatedAt: string;
  type: ExcursionTypesEnum;
  travelMode: TravelModesEnum;
  viewsCount: number;
  images: string[];
}
