export interface ISearchForm {
  categories: number[];
  types: number[];
  title: string;
  radius: number;
  searchByMe: boolean;
  search: string | null;
  locationTitle: string;
  locationInputValue: string;
  showMap: boolean;
  orderBy: SearchOrderByStringEnum;
}

export enum SearchOrderByStringEnum {
  CREATED_AT = "0",
  RATING = "1",
}
