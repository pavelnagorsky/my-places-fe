import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";

export interface IExcursionModerationItem {
  id: number;
  slug: string;
  title: string;
  places: IExcursionModerationItem[];
  createdAt: string;
  updatedAt: string;
  type: ExcursionTypesEnum;
  authorName: string;
  authorEmail: string;
}
