import { CrmStatusesEnum } from "@/services/interfaces";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";

export interface IReportsFormContext {
  search?: string;
  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
  statuses: CrmStatusesEnum[];
  entityTypes: `${StatisticEntitiesEnum}`[];
}
