import { CrmStatusesEnum, IPaginationRequest } from "@/services/interfaces";

export enum UserTypesEnum {
  PRIVATE = 1,
  COMPANY = 2,
}

export interface IFeedbackListRequest extends IPaginationRequest {
  dateFrom?: string | null;
  dateTo?: string | null;
  authorEmail?: string;
  statuses?: CrmStatusesEnum[];
  requestTypes?: UserTypesEnum[];
}
