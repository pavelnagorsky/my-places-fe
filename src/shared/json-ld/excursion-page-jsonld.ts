import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { Environment } from "@/shared/Environment";
import { routerLinks } from "@/routing/routerLinks";

const excursionPageJsonld = (excursion: IExcursion) => {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip", // Or "Trip" if more generic
    name: excursion.title,
    description: excursion.description,
    itinerary: excursion.places.map((place, index) => ({
      "@type": "TouristAttraction",
      name: place.title,
      position: index + 1,
    })),
    duration: `PT${excursion.duration}M`, // ISO 8601 duration format (minutes)
    distance: {
      "@type": "QuantitativeValue",
      value: excursion.distance,
      unitText: "km", // or "miles" depending on your unit
    },
    travelMode: excursion.travelMode.toLowerCase(), // e.g. "walking", "driving"
    image: excursion.images[0],
    creator: {
      "@type": "Person",
      name: excursion.authorName,
    },
    dateCreated: excursion.createdAt,
    dateModified: excursion.updatedAt,
    potentialAction: {
      "@type": "ViewAction",
      target: `https://${Environment.domain}${routerLinks.excursion(
        excursion.slug
      )}`,
    },
  };
};

export default excursionPageJsonld;
