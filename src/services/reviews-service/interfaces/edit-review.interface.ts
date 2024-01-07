import { IImage } from "@/services/file-service/image.interface";

export interface IEditReview {
  id: number;

  title: string;

  description: string;

  placeId: number;

  placeTitle: string;

  images: IImage[];
}
