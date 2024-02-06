export interface IModerationReviewsFormContext {
  search: string;
  authorEmail?: string;
  dateFrom?: string | Date | null;
  dateTo?: string | Date | null;
}
