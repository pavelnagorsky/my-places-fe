import { Environment } from "@/shared/Environment";

export const defaultBounds = {
  south: 51.26201100000001,
  west: 23.1783377,
  north: 56.1718719,
  east: 32.7768202,
};
export const defaultCountrySign = "BY";

const googleMapsLibraries = ["places", "geometry"];

const mapConfig = {
  id: "google-Map-script",
  googleMapsApiKey: Environment.googleMapsKey,
  libraries: googleMapsLibraries as any,
  language: "ru",
  region: defaultCountrySign,
};

export default mapConfig;
