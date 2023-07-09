import { ILatLngCoordinate } from "@/components/Map/Map";

const utils = {
  kmToMeters: (km: number) => {
    return km * 1000;
  },

  latLngToString: (latLng: ILatLngCoordinate) => {
    return `${latLng.lat};${latLng.lng}`;
  },

  isBrowser: () => typeof window !== "undefined",

  stringToLatLng: (coordinates: string): ILatLngCoordinate | null => {
    const latLng = coordinates.split(";");
    if (typeof latLng[0] === "undefined" && typeof latLng[1] === "undefined")
      return null;
    return {
      lat: +latLng[0],
      lng: +latLng[1],
    };
  },
};

export default utils;
