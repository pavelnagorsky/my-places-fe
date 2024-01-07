import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { ILatLngCoordinate } from "@/components/map/Map";

export interface IPlace {
  id: number;
  slug: string;
  title: string;
  description: string;
  address: string;
  type: IPlaceType;
  likesCount: number;
  viewsCount: number;
  categories: IPlaceCategory[];
  images: string[];
  coordinates: ILatLngCoordinate;
  website: string;
  advertisement: boolean;
  advEndDate: string;
  createdAt: string;
}
