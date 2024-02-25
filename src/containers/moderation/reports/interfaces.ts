import { CrmStatusesEnum } from "@/services/interfaces";

export interface IReportsFormContext {
  search?: string;
  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
  statuses: CrmStatusesEnum[];
}
