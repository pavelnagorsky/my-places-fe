import { IReviewFormContext } from "@/containers/create-review/form/interfaces";

export interface IEditReviewFormContext extends IReviewFormContext {
  updateTranslations: boolean;
}
