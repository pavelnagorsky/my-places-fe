import {
  IAdminImage,
  IAdminTranslation,
  ICreateAdminTranslation,
} from "../interfaces";

export interface IPlaceCategoryAdmin {
  id: number;
  titleTranslations: IAdminTranslation[];
  image: IAdminImage | null;
  image2: IAdminImage | null;
}

export interface ICreatePlaceCategoryAdmin {
  titleTranslations: ICreateAdminTranslation[];
  imageId: number | null;
  imageId2: number | null;
}
