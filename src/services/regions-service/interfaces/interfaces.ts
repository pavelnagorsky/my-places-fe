import {
  IAdminTranslation,
  ICreateAdminTranslation,
} from "@/services/interfaces";

export interface IRegionForEdit {
  id: number;
  titleTranslations: IAdminTranslation[];
}

export interface ICreateRegion {
  titleTranslations: ICreateAdminTranslation[];
}
