import Geocode from "react-geocode";

import { Environment } from "../../shared/Environment";
import { useTranslation } from "next-i18next";

export const useGeocode = () => {
  const { i18n } = useTranslation();
  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey(Environment.googleGeocodeKey);
  Geocode.setLanguage(i18n.language);
  Geocode.setRegion("by");
  Geocode.setLocationType("ROOFTOP");
  return Geocode;
};
