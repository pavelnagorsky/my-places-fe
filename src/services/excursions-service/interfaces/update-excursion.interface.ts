import { ICreateExcursion } from "@/services/excursions-service/interfaces/create-excursion.interface";

export interface IUpdateExcursion extends ICreateExcursion {
  id: number;
  shouldTranslate: boolean;
}
