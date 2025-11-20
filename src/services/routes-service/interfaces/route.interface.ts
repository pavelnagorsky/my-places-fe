import { ILatLngCoordinate } from "@/components/map/Map";
import { IRoutePlace } from "@/services/routes-service/interfaces/route-place.interface";
import { TravelModesEnum } from "@/services/routes-service/interfaces/interfaces";

export interface IRoute {
  id: number;

  // Route start coordinates {lat;lng}
  coordinatesStart: ILatLngCoordinate;

  // Route end coordinates {lat;lng}
  coordinatesEnd: ILatLngCoordinate | null;

  title: string;

  duration: number; // Minutes

  distance: number; // Km

  // Distance in km - from last place to end of the route
  lastRouteLegDistance: number;

  // Duration in minutes - from last place to end of the route
  lastRouteLegDuration: number;

  places: IRoutePlace[];

  createdAt: string;

  updatedAt: string;

  travelMode: TravelModesEnum;
}
