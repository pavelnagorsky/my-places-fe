import { IExcursionListItemPlace } from "@/services/excursions-service/interfaces/excursion-list-item-place.interface";
import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";

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
  commentsCount: number;
  likesCount: number;
  status: ExcursionStatusesEnum;
  moderationMessage: string | null;
  authorName: string;
  authorEmail: string;
}
