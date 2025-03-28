import { IPaginationRequest } from "@/services/interfaces";
import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";
import { IMyPlacesRequest } from "@/services/places-service/interfaces/interfaces";

export interface IMyExcursionsRequest
  extends IPaginationRequest<MyExcursionsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses: ExcursionStatusesEnum[];
}

export enum MyExcursionsOrderByEnum {
  CREATED_AT,
  TITLE,
  STATUS,
  TYPE,
  UPDATED_AT,
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

export interface IAdminExcursionsRequest extends IMyExcursionsRequest {
  userIds?: number[];
}
