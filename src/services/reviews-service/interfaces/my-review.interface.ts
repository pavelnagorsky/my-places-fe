import { ReviewStatusesEnum } from "@/services/reviews-service/interfaces/review-statuses.enum";

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
}
