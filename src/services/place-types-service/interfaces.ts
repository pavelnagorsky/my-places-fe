import {
  IAdminImage,
  IAdminTranslation,
  ICreateAdminTranslation,
} from "@/services/interfaces";

export interface IPlaceTypeAdmin {
  id: number;
  titleTranslations: IAdminTranslation[];
  commercial: boolean;
  image: IAdminImage | null;
  image2: IAdminImage | null;
}

export interface ICreatePlaceTypeAdmin {
  titleTranslations: ICreateAdminTranslation[];
  commercial: boolean;
  imageId: number | null;
  imageId2: number | null;
}
