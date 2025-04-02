import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";

export interface IChangeExcursionStatus {
  status: ExcursionStatusesEnum;

  message?: string;
}
