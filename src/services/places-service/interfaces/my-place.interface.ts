import { PlaceStatusesEnum } from "@/services/places-service/interfaces/place-statuses.enum";

export interface IMyPlace {
  id: number;
  slug: string;
  advertisement: boolean;
  advEndDate: string | null;
  moderationMessage: string | null;
  likesCount: number;
  viewsCount: number;
  status: PlaceStatusesEnum;
  createdAt: string;
  updatedAt: string;
  type: string;
  title: string;
  reviewsCount: number;
  commentsCount: number;
  author: string | null;
}
