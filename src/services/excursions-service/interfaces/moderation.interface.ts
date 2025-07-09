import { IModeration } from "@/services/places-service/interfaces/moderation.interface";

export interface IExcursionModeration extends IModeration {
  cityId?: number | null;
}
