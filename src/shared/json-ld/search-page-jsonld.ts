import { ISearchPlace } from "@/services/places-service/interfaces/search-place.interface";

const searchPageJsonld = (places: ISearchPlace[]) => {
  return {
    "@context": "https://schema.org",
    "@graph": places.map((p) => {
      return {
        "@type": "Place",
        name: p.title,
        description: p.description,
        image: p.image,
        geo: {
          "@type": "GeoCoordinates",
          latitude: p.coordinates.lat + "",
          longitude: p.coordinates.lng + "",
        },
        address: p.address || "",
      };
    }),
  };
};

export default searchPageJsonld;
