import { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { Environment } from "@/shared/Environment";
import { googleMapsLibraries } from "@/components/map/Map";

let autocompleteService: google.maps.places.AutocompleteService | null = null;

export function useGoogleAutocompleteService() {
  const { isLoaded } = useJsApiLoader({
    id: "google-Map-script",
    googleMapsApiKey: Environment.googleMapsKey,
    libraries: googleMapsLibraries as any,
  });

  useEffect(() => {
    if (isLoaded) {
      autocompleteService = new google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  return autocompleteService;
}
