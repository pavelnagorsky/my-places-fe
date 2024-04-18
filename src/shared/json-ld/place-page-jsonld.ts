import { IPlace } from "@/services/places-service/interfaces/place.interface";

const placePageJsonld = (place: IPlace) => {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: place.title,
    description: place.description,
    image: place.images[0],
    touristType: place.categories.map((c) => c.title).join(", "),
    additionalType: place.type.title,
    location: {
      "@type": "Place",
      address: place.address,
      geo: {
        "@type": "GeoCoordinates",
        latitude: place.coordinates.lat + "",
        longitude: place.coordinates.lng + "",
      },
    },
    publicAccess: true,
  };
};

export default placePageJsonld;
