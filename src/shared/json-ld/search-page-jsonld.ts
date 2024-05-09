import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";

const searchPageJsonld = (places: ISearchPlace[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": places.map((place) => {
      return {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: place.title,
        description: place.description,
        image: place.image ?? undefined,
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
    }),
  };
};

export default searchPageJsonld;
