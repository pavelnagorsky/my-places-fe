import { CrmStatusesEnum, IPaginationRequest } from "@/services/interfaces";
import {
  ReportsOrderByEnum,
  StatisticEntitiesEnum,
} from "@/services/reports-service/enums";

export interface ICreateReport {
  entityId: number;
  entityType: StatisticEntitiesEnum;
  text: string;
}

export interface IGetReportsRequest
  extends IPaginationRequest<ReportsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses?: CrmStatusesEnum[];
  entityTypes?: StatisticEntitiesEnum[];
}
