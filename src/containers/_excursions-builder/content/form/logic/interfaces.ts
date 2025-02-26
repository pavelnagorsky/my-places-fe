import ISelectPlace from "@/services/places-service/interfaces/select-place.interface";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";
import { ExcursionTypesEnum } from "@/services/excursions-service/interfaces/excursion-types.enum";

export interface IExcursionBuilderForm {
  title: string;
  description: string;
  addPlaces: ISelectPlace[];
  travelMode: TravelModesEnum;
  type: ExcursionTypesEnum;
  places: IExcursionBuilderFormPlace[];
}

export interface IExcursionBuilderFormPlace {
  id: number;
  excursionDuration: Date;
}
