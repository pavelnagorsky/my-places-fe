import { ILatLngCoordinate } from "@/components/map/Map";
import { LanguageIdsEnum } from "@/shared/LanguageIdsEnum";
import I18nLanguages from "@/shared/I18nLanguages";

function isEmpty(obj: Object) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}

const utils = {
  kmToMeters: (km: number) => {
    return km * 1000;
  },

  latLngToString: (latLng: ILatLngCoordinate) => {
    return `${latLng.lat};${latLng.lng}`;
  },

  parseLanguageIdToLocale: (langId: LanguageIdsEnum) => {
    if (langId === LanguageIdsEnum.ru) return I18nLanguages.ru;
    if (langId === LanguageIdsEnum.be) return I18nLanguages.be;
    if (langId === LanguageIdsEnum.en) return I18nLanguages.en;
    return I18nLanguages.ru;
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

  isEmptyObject: (value: any) => {
    if (value == null) {
      // null or undefined
      return false;
    }
    if (typeof value !== "object") {
      // boolean, number, string, function, etc.
      return false;
    }
    const proto = Object.getPrototypeOf(value);
    // consider `Object.create(null)`, commonly used as a safe map
    // before `Map` support, an empty object as well as `{}`
    if (proto !== null && proto !== Object.prototype) {
      return false;
    }
    return isEmpty(value);
  },
};

export default utils;
