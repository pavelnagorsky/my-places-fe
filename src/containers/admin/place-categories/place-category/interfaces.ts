import { IAdminImage, ICreateAdminTranslation } from "@/services/interfaces";

export interface IPlaceCategoryFormContext {
  titleTranslations: ICreateAdminTranslation[];
  image: IAdminImage | null;
  image2: IAdminImage | null;
}
