import { IPaginationRequest } from "@/services/interfaces";
import { ExcursionStatusesEnum } from "@/services/excursions-service/enums/excursion-statuses.enum";
import {
  ModerationExcursionsOrderByEnum,
  MyExcursionsOrderByEnum,
  SearchExcursionsOrderByEnum,
} from "@/services/excursions-service/enums/enums";
import { ExcursionTypesEnum } from "@/services/excursions-service/enums/excursion-types.enum";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";

export interface IMyExcursionsRequest
  extends IPaginationRequest<MyExcursionsOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
  statuses: ExcursionStatusesEnum[];
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

export interface ISearchExcursionsRequest
  extends IPaginationRequest<SearchExcursionsOrderByEnum> {
  search: string;
  types: ExcursionTypesEnum[];
  travelModes: TravelModesEnum[];
  regionIds: number[];
}
