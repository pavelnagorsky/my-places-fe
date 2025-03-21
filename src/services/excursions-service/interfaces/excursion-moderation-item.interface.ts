import { ExcursionTypesEnum } from "@/services/excursions-service/interfaces/excursion-types.enum";

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
