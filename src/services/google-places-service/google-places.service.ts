import axios from "axios";
import { Environment } from "@/shared/Environment";

const googlePlacesAutocompleteService = {
  // get google place info by google placeId
  findPlaceByPlaceId: (placeId: string) => {
    return axios.get<google.maps.GeocoderResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${Environment.googleMapsKey}`
    );
  },
};

export default googlePlacesAutocompleteService;
