import { PlaceStatusesEnum } from "../enums/place-statuses.enum";

export interface IChangePlaceStatus {
  status: PlaceStatusesEnum;

  advertisement: boolean;

  advEndDate?: string;

  message?: string;
}
