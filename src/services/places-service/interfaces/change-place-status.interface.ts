import { PlaceStatusesEnum } from "./place-statuses.enum";

export interface IChangePlaceStatus {
  status: PlaceStatusesEnum;

  advertisement: boolean;

  advEndDate?: string;

  message?: string;
}
