import { IImage } from "@/services/file-service/image.interface";

export interface IPlaceFormContext {
  title: string;
  description: string;
  slug: string;
  images: IImage[];
  placeTypeId: number;
  categoriesIds: number[];
  lat: number | string;
  lng: number | string;
  address: string;
  isCommercial: boolean;
  website?: string;
}

export interface IPlaceTabProps {
  readonly?: boolean;
}
