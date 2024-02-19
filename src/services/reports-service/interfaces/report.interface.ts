import { CrmStatusesEnum } from "@/shared/interfaces";

export interface IReport {
  id: number;

  text: string;

  createdAt: Date;

  status: CrmStatusesEnum;

  placeSlug: string;
}
