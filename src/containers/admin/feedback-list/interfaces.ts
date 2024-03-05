import { UserTypesEnum } from "@/services/contact-service/interfaces/interfaces";
import { CrmStatusesEnum } from "@/services/interfaces";

export interface IFeedbackListFiltersForm {
  dateFrom?: Date | string | null;
  dateTo?: Date | string | null;
  authorEmail?: string;
  requestTypes: UserTypesEnum[];
  statuses: CrmStatusesEnum[];
}
