import { ILatLngCoordinate } from "@/components/map/Map";
import { IRoutePlace } from "@/services/routes-service/interfaces/route-place.interface";

export interface IRoute {
  // Route start coordinates {lat;lng}
  coordinatesStart: ILatLngCoordinate;

  // Route end coordinates {lat;lng}
  coordinatesEnd: ILatLngCoordinate;

  title: string;

  duration: number; // Minutes

  distance: number; // Km

  places: IRoutePlace[];
}
