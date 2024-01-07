import { ICreateReview } from "@/services/reviews-service/interfaces/create-review.interface";

export interface IUpdateReview extends ICreateReview {
  shouldTranslate: boolean;
}
