import { StaticImageData } from "next/image";

export interface ICardConfig {
  image: StaticImageData;
  title: string;
  description: string;
  chips?: { title: string; filterValue: string }[];
  filterValue: string;
}
