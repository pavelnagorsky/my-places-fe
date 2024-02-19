export interface ISelect {
  id: number;
  label: string;
}

export enum OrderDirectionsEnum {
  ASC = 0,
  DESC = 1,
}

export enum CrmStatusesEnum {
  PENDING,
  DECLINED,
  CLOSED,
}
