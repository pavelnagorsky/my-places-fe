import { ILatLngCoordinate } from "@/components/map/Map";
import { IExcursionPlaceReview } from "@/services/excursions-service/interfaces/excursion-place-review.interface";

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
  reviews: IExcursionPlaceReview[];
}
