import { IExcursionListItemPlace } from "@/services/excursions-service/interfaces/excursion-list-item-place.interface";
import { ExcursionTypesEnum } from "@/services/excursions-service/interfaces/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { ExcursionStatusesEnum } from "@/services/excursions-service/interfaces/excursion-statuses.enum";

export interface IExcursionListItem {
  id: number;
  slug: string;
  title: string;
  duration: number;
  excursionDuration: number;
  distance: number;
  places: IExcursionListItemPlace[];
  createdAt: string;
  updatedAt: string;
  type: ExcursionTypesEnum;
  travelMode: TravelModesEnum;
  viewsCount: number;
  status: ExcursionStatusesEnum;
  moderationMessage: string | null;
}
