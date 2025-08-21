import { IImage } from "@/services/file-service/image.interface";
import { IFileUploadResponse } from "@/services/place-files-service/interfaces";

export interface IPlaceFormContext {
  title: string;
  description: string;
  images: IImage[];
  attachments: IFileUploadResponse[];
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
