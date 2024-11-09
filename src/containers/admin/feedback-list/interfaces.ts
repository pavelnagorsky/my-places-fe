import { UserTypesEnum } from "@/services/contact-service/interfaces/interfaces";
import { CrmStatusesEnum } from "@/services/interfaces";

export interface IFeedbackListFiltersForm {
  dateFrom?: Date | null;
  dateTo?: Date | null;
  authorEmail?: string;
  requestTypes: UserTypesEnum[];
  statuses: CrmStatusesEnum[];
}
