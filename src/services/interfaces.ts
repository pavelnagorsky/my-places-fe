export interface ICreateAdminTranslation {
  langId: number;
  text: string;
}

export interface IAdminImage {
  id: number;
  url: string;
}

export interface IAdminTranslation {
  id: number;
  textId: number;
  text: string;
  original: boolean;
  language: number;
}

export enum OrderDirectionsEnum {
  ASC = 0,
  DESC = 1,
}

export enum CrmStatusesEnum {
  PENDING,
  DECLINED,
  DONE,
}

export interface IPaginationRequest<OrderByType = number> {
  page: number;
  pageSize: number;
  orderBy?: OrderByType;
  orderAsc?: boolean;
}

export interface IPaginationResponse<T> {
  page: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}
