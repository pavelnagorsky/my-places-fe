import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { IExcursionPlace } from "@/services/excursions-service/interfaces/excursion-place.interface";
import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";

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
  authorName: string;
  moderationMessage: string | null;
  status: ExcursionStatusesEnum;
}
