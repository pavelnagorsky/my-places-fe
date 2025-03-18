import { ILatLngCoordinate } from "@/components/map/Map";

export interface IExcursionPlace {
  id: number;
  slug: string;
  title: string;
  address: string;
  excursionDuration: number;
  excursionDescription: string;
  duration: number;
  distance: number;
  coordinates: ILatLngCoordinate;
}
