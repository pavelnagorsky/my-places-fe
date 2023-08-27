import ISelectPlace from "@/services/places-service/select-place.interface";
import { IImage } from "@/services/file-service/image.interface";

export interface IReviewFormContext {
  title: string;
  description: string;
  place: ISelectPlace | null;
  images: IImage[];
}
