import { CrmStatusesEnum } from "@/shared/interfaces";
import { IReport } from "./report.interface";

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

export interface IGetReportsRequest {
  lastIndex: number;
  itemsPerPage: number;
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses?: CrmStatusesEnum[];
  orderBy?: ReportsOrderByEnum;
  orderAsc?: boolean;
}

export interface IGetReportsResponse {
  data: IReport[];
  hasMore: boolean;
  lastIndex: number;
}
