import { IPlaceFormContext } from "@/containers/CreatePlace/Form/interfaces";

export interface IEditPlaceContext extends IPlaceFormContext {
  updateTranslations: boolean;
}
