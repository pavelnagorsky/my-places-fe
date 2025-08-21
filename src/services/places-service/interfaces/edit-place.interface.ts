import { ILatLngCoordinate } from "@/components/map/Map";
import { IImage } from "@/services/file-service/image.interface";
import { IFileUploadResponse } from "@/services/place-files-service/interfaces";

export interface IEditPlace {
  id: number;

  slug: string;

  title: string;

  description: string;

  address: string;

  typeId: number;

  categoriesIds: number[];

  images: IImage[];

  files: IFileUploadResponse[];

  coordinates: ILatLngCoordinate;

  website: string | null;

  advertisement: boolean;

  advEndDate: string | null;
}
