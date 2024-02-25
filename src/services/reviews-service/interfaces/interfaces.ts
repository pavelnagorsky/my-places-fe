import { IReview } from "@/services/reviews-service/interfaces/review.interface";
import { ReviewStatusesEnum } from "@/services/reviews-service/interfaces/review-statuses.enum";
import { IPaginationRequest } from "@/services/interfaces";

export interface ISearchReview extends Omit<IReview, "images"> {}

export interface IMyReviewsRequest
  extends IPaginationRequest<MyReviewsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses?: ReviewStatusesEnum[];
}

export enum MyReviewsOrderByEnum {
  CREATED_AT = 0,
  TITLE = 1,
  PLACE_TITLE = 2,
  STATUS = 3,
  VIEWS = 4,
}

export enum ModerationReviewsOrderByEnum {
  CREATED_AT,
  UPDATED_AT,
  TITLE,
  PLACE_TITLE,
  AUTHOR,
}

export interface IModerationReviewsRequest
  extends IPaginationRequest<ModerationReviewsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  authorEmail?: string;
}
