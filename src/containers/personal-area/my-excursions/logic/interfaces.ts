import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";

export interface IMyExcursionsFormContext {
  search: string;
  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
  statuses: ExcursionStatusesEnum[];
}
