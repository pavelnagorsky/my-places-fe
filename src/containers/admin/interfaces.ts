import { ChangeEvent, MouseEventHandler } from "react";

export interface IOrderBy<T = any> {
  id: keyof T | null;
  direction: "asc" | "desc";
}

export interface ITableHeadProps {
  order: IOrderBy;
  onRequestSort: (event: MouseEventHandler<any>, property: any) => void;
  rowCount: number;
}

export interface ITableProps {
  searchText: string;
}

export interface ICMSHeaderProps {
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}
