import { IAdminImage, ICreateAdminTranslation } from "@/services/interfaces";

export interface IPlaceTypeFormContext {
  titleTranslations: ICreateAdminTranslation[];
  commercial: boolean;
  image: IAdminImage | null;
  image2: IAdminImage | null;
}
