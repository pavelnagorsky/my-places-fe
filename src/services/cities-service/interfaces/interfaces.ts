import {
  IAdminTranslation,
  ICreateAdminTranslation,
} from "@/services/interfaces";

export interface ICityForEdit {
  id: number;
  titleTranslations: IAdminTranslation[];
}

export interface ICreateCity {
  titleTranslations: ICreateAdminTranslation[];
}
