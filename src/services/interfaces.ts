export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

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
