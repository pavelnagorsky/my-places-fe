import { IPlaceFormContext } from "@/containers/create-place/form/interfaces";

export interface IEditPlaceContext extends IPlaceFormContext {
  updateTranslations: boolean;
}
