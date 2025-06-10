import { StaticImageData } from "next/image";

export interface ICardConfig {
  images: StaticImageData[];
  filter?: {
    title: string;
    image: StaticImageData;
    placesCount: number;
    filterValue: string;
  };
  clickableSection?: {
    title: string;
    icon: StaticImageData;
    filterValue: string;
  };
}
