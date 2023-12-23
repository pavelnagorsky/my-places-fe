import { ILatLngCoordinate } from "@/components/Map/Map";
import { IImage } from "@/services/file-service/image.interface";

export interface IEditPlace {
  id: number;

  slug: string;

  title: string;

  description: string;

  address: string;

  typeId: number;

  categoriesIds: number[];

  images: IImage[];

  coordinates: ILatLngCoordinate;

  website: string | null;

  advertisement: boolean;

  advEndDate: string | null;
}
