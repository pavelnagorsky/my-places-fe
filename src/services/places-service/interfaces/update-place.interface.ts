import { ICreatePlace } from "@/services/places-service/interfaces/create-place.interface";

export interface IUpdatePlace extends ICreatePlace {
  shouldTranslate: boolean;
}
