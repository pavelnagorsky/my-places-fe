import { IReview } from "@/services/reviews-service/review.interface";

export interface ISearchReviewsResponse {
  data: IReview[];
  hasMore: boolean;
  totalResults: number;
}
