import { ILatLngCoordinate } from "@/components/map/Map";

export interface IExcursionListItemPlace {
  id: number;
  slug: string;
  title: string;
  excursionDuration: number;
  duration: number;
  distance: number;
  coordinates: ILatLngCoordinate;
}
