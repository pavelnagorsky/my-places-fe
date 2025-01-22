import { ILatLngCoordinate } from "@/components/map/Map";

export interface IRoutePlace {
  id: number;

  slug: string;

  title: string;

  coordinates: ILatLngCoordinate;

  duration: number; // Minutes

  distance: number; // Km
}
