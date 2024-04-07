export interface ICreatePlace {
  title: string;
  description: string;
  imagesIds: number[];
  placeTypeId: number;
  categoriesIds: number[];
  coordinates: string;
  address: string;
  isCommercial: boolean;
  website?: string;
}
