import { IPaginationRequest } from "@/services/interfaces";

export interface IMyExcursionsRequest
  extends IPaginationRequest<MyExcursionsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}

export enum MyExcursionsOrderByEnum {
  CREATED_AT,
  TITLE,
  STATUS,
  TYPE,
}

export enum ModerationExcursionsOrderByEnum {
  CREATED_AT,
  UPDATED_AT,
  TITLE,
  AUTHOR,
  TYPE,
}

export interface IModerationExcursionsRequest
  extends IPaginationRequest<ModerationExcursionsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}
