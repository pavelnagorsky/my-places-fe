import { IReview } from "@/services/reviews-service/interfaces/review.interface";
import { ReviewStatusesEnum } from "@/services/reviews-service/interfaces/review-statuses.enum";
import { IMyReview } from "@/services/reviews-service/interfaces/my-review.interface";

export interface ISearchReviewsResponse {
  data: ISearchReview[];
  hasMore: boolean;
  totalResults: number;
}

export interface ISearchReview extends Omit<IReview, "images"> {}

export interface IMyReviewsRequest {
  lastIndex: number;
  itemsPerPage: number;
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses?: ReviewStatusesEnum[];
  orderBy?: MyReviewsOrderByEnum;
  orderAsc?: boolean;
}

export enum MyReviewsOrderByEnum {
  CREATED_AT = 0,
  TITLE = 1,
  PLACE_TITLE = 2,
  STATUS = 3,
  VIEWS = 4,
}

export interface IMyReviewsResponse {
  data: IMyReview[];
  lastIndex: number;
  hasMore: boolean;
}
