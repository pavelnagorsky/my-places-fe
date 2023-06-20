import {useEffect, useState} from "react";

export function useGoogleAutocompleteService() {
    // const isApiLoaded = useAppSelector(selectGoogleApiLoaded)
    const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null)

    useEffect(() => {
        if (!service && typeof window && window.google) setService(new google.maps.places.AutocompleteService())
    }, [typeof window, typeof google])

    return service;
}