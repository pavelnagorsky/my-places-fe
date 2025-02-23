import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import mapConfig from "@/components/map/config";

let autocompleteService: google.maps.places.AutocompleteService | null = null;

export function useGoogleAutocompleteService() {
  const { isLoaded } = useJsApiLoader(mapConfig);
  const [isInitialized, setIsInitialized] = useState(isLoaded);

  useEffect(() => {
    if (isLoaded) {
      autocompleteService = new google.maps.places.AutocompleteService();
      setIsInitialized(true);
    }
  }, [isLoaded]);

  return { autocompleteService, isInitialized };
}
