import { useEffect, useState } from "react";

export function useGoogleAutocompleteService() {
  // const isApiLoaded = useAppSelector(selectGoogleApiLoaded)
  const [service, setService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (!service) setService(new google.maps.places.AutocompleteService());
  }, []);

  return service;
}
