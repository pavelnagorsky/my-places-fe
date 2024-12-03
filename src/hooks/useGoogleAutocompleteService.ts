import { useEffect, useRef } from "react";

const autocompleteService: {
  current: google.maps.places.AutocompleteService | null;
} = { current: null };

export function useGoogleAutocompleteService() {
  const loaded = useRef(false);

  const googleMapsLoaded =
    typeof google !== "undefined" &&
    typeof google.maps !== "undefined" &&
    typeof google.maps.places !== "undefined";

  useEffect(() => {
    if (!loaded.current && googleMapsLoaded) {
      loaded.current = true;
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
    }
  }, [googleMapsLoaded]);

  return autocompleteService.current;
}
