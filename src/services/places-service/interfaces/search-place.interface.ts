import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import { ILatLngCoordinate } from "@/components/map/Map";

export interface ISearchPlace {
  // Place id
  id: number;

  // Place url path
  slug: string;

  // Place title
  title: string;

  // Place description
  description: string;

  // Likes count
  likesCount: number;

  // Views count
  viewsCount: number;

  // Place address
  address: string;

  // Place type
  type: IPlaceType;

  // Place categories
  categories: IPlaceCategory[];

  // Place image
  image: string;

  // Place coordinates {lat;lng}
  coordinates: ILatLngCoordinate;

  // Place website url
  website: string | null;

  // is place an advertisement
  advertisement: boolean;

  // advertisement end date
  advEndDate: string | null;

  // created at
  createdAt: string;
}
