export interface IMyPlacesFormContext {
  search: string;
  statuses?: string[];
  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
}
