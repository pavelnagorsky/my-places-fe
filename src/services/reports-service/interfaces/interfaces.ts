import { CrmStatusesEnum, IPaginationRequest } from "@/services/interfaces";

export interface ICreateReport {
  placeId: number;
  text: string;
}

export enum ReportsOrderByEnum {
  TEXT,
  PLACE_SLUG,
  CREATED_AT,
  STATUS,
}

export interface IGetReportsRequest
  extends IPaginationRequest<ReportsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses?: CrmStatusesEnum[];
}
