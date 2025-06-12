import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { memo } from "react";
import PlaceGallery from "@/containers/place/content/gallery/PlaceGallery";

const ExcursionGallery = ({ excursion }: { excursion: IExcursion }) => {
  // Pre-sort places once
  const sortedPlaces = excursion.places.some((p) => p.isPrimary)
    ? [
        ...excursion.places.filter((p) => p.isPrimary),
        ...excursion.places.filter((p) => !p.isPrimary),
      ]
    : excursion.places;

  return (
    <PlaceGallery
      showStatus
      images={excursion.images.map((image, i) => ({
        src: image,
        title: sortedPlaces[i]?.title || "",
        alt: sortedPlaces[i]?.title || excursion.title,
      }))}
      mobileHeight={250}
      laptopHeight={380}
      desktopHeight={480}
    />
  );
};

export default memo(ExcursionGallery);
