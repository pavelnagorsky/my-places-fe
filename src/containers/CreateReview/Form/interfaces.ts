import ISelectPlace from "@/services/places-service/select-place.interface";

export interface IReviewFormContext {
  title: string;
  description: string;
  place: ISelectPlace | null;
  imagesIds: number[];
}
