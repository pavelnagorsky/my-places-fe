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
  DISTANCE,
  DURATION,
}

export enum ModerationExcursionsOrderByEnum {
  CREATED_AT,
  TITLE,
  DISTANCE,
  DURATION,
}

export interface IModerationExcursionsRequest
  extends IPaginationRequest<ModerationExcursionsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}
