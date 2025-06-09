import { useEffect, useState } from "react";
import { useGoogleDirectionsService } from "@/hooks/google/useGoogleDirectionsService";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { useTranslation } from "next-i18next";

const useExcursionDirections = ({ excursion }: { excursion: IExcursion }) => {
  const { directionsService, isInitialized } = useGoogleDirectionsService();
  const { i18n } = useTranslation("excursion-management");
  const [directions, setDirections] = useState<any | null>(null);

  useEffect(() => {
    if (!isInitialized || !directionsService) return;
    const waypoints = excursion.places.map((place) => ({
      location: { lat: place.coordinates.lat, lng: place.coordinates.lng },
      stopover: true,
    }));
    // Set the origin to the first waypoint
    const origin = waypoints[0].location;

    // Set the destination to the last waypoint
    const destination = waypoints[waypoints.length - 1].location;

    // Exclude the first and last items from the waypoints array
    const intermediateWaypoints = waypoints.slice(1, waypoints.length - 1);
    directionsService.route(
      {
        origin,
        destination,
        waypoints: intermediateWaypoints,
        optimizeWaypoints: false,
        language: i18n.language,
        travelMode: excursion.travelMode as any,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && !!result) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
          setDirections(null);
        }
      }
    );
  }, [excursion, isInitialized]);

  return directions;
};

export default useExcursionDirections;
