import { CrmStatusesEnum } from "@/services/interfaces";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";

export interface IReport {
  id: number;

  text: string;

  createdAt: Date;

  status: CrmStatusesEnum;

  entityType: StatisticEntitiesEnum;

  entityId: number;

  entitySlug: string | null;
}
