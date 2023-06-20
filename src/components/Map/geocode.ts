import Geocode from "react-geocode";

import {Environment} from "../../shared/Environment";
import i18n from "../../i18n";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(Environment.googleMapsKey);
// set response language. Defaults to english.
Geocode.setLanguage(i18n.language);
Geocode.setLocationType("ROOFTOP");

// Enable or disable logs. Its optional.
// Geocode.enableDebug();

export default Geocode;