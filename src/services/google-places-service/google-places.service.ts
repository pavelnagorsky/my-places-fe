import axios from "axios";
import { Environment } from "@/shared/Environment";
import { ILatLngCoordinate } from "@/components/map/Map";

const googlePlacesAutocompleteService = {
  // get google place info by google placeId
  findPlaceByPlaceId: (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${Environment.googleGeocodeKey}`;
    return axios.get<google.maps.GeocoderResponse>(url);
  },

  getLocationTitle: (coordinates: ILatLngCoordinate, language: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&language=${language}&key=${Environment.googleGeocodeKey}`;

    return axios.get<google.maps.GeocoderResponse>(url);
  },
};

export default googlePlacesAutocompleteService;
