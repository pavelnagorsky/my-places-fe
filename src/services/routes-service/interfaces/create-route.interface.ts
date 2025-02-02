import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";

export interface ICreateRoute {
  title: string;

  placeIds: number[];

  coordinatesStart: string;

  coordinatesEnd: string;

  travelMode: TravelModesEnum;
}
