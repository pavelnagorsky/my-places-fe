import { IPaginationRequest } from "@/services/interfaces";

export interface IMyRoutesRequest
  extends IPaginationRequest<MyRoutesOrderByEnum> {
  dateFrom?: string | null;
  dateTo?: string | null;
  search?: string;
}

export enum MyRoutesOrderByEnum {
  CREATED_AT,
  TITLE,
  DISTANCE,
  DURATION,
}

export enum TravelModesEnum {
  DRIVING = "DRIVING",
  WALKING = "WALKING",
}
