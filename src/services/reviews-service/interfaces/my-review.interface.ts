import { ReviewStatusesEnum } from "@/services/reviews-service/enums/review-statuses.enum";

export interface IMyReview {
  id: number;

  status: ReviewStatusesEnum;

  moderationMessage: string | null;

  title: string;

  viewsCount: number;

  createdAt: string;

  updatedAt: string;

  placeTitle: string;

  placeSlug: string;

  placeId: number;

  author: string | null;
}
