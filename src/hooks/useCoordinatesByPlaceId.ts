import googlePlacesAutocompleteService from "@/services/google-places-service/google-places.service";

export const useCoordinatesByPlaceId = () => {
  const searchFunc = (placeId: string) =>
    googlePlacesAutocompleteService
      .findPlaceByPlaceId(placeId)
      .then(({ data }) => {
        if (!data.results[0]?.geometry) throw new Error("no results");
        const placeGeometry = data.results[0].geometry;
        return placeGeometry.location;
      });

  return searchFunc;
};
