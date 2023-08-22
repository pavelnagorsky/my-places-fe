export interface IPlaceFormContext {
  title: string;
  description: string;
  slug: string;
  imagesIds: number[];
  placeTypeId: number;
  categoriesIds: number[];
  coordinates: string;
  address: string;
  website?: string;
}
