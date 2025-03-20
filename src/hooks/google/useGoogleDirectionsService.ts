import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import mapConfig from "@/components/map/config";

let directionsService: google.maps.DirectionsService | null = null;

export function useGoogleDirectionsService() {
  const { isLoaded } = useJsApiLoader(mapConfig);
  const [isInitialized, setIsInitialized] = useState(isLoaded);

  useEffect(() => {
    if (isLoaded) {
      directionsService = new google.maps.DirectionsService();
      setIsInitialized(true);
    }
  }, [isLoaded]);

  return { directionsService, isInitialized };
}
