import { CrmStatusesEnum } from "@/shared/interfaces";

export interface IReport {
  id: number;

  text: string;

  createdAt: Date;

  status: CrmStatusesEnum;

  placeId: number;

  placeSlug: string;
}
