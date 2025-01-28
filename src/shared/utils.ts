import { ILatLngCoordinate } from "@/components/map/Map";
import { LanguageIdsEnum } from "@/shared/LanguageIdsEnum";
import I18nLanguages from "@/shared/I18nLanguages";
import { TFunction } from "next-i18next";
import { isValid } from "date-fns";

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

  stringToLatLng: (coordinates: string): ILatLngCoordinate => {
    const latLng = coordinates.split(";");
    const lat = latLng[0] ? +latLng[0] : 1;
    const lng = latLng[1] ? +latLng[1] : 1;
    return {
      lat,
      lng,
    };
  },

  dateOutputTransform: (value: Date | null) => {
    if (!isValid(value)) return null;
    return value;
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

  calculateCurrentScrollPage: (total: number, pageSize: number): number => {
    const currentPage = Math.floor(total / pageSize);
    return currentPage;
  },

  calculateTotalPages: (totalItems: number, pageSize: number): number => {
    return Math.ceil(totalItems / pageSize);
  },

  // function to parse filter dates with correct start / end time
  parseFilterDate: (
    date: string | Date | null | undefined,
    startRange: boolean
  ): string | undefined => {
    if (!date) return undefined;
    if (typeof date === "string") {
      date = new Date(date);
    }
    const month = date.getMonth() + 1;
    const monthStr = month > 9 ? `${month}` : `0${month}`;
    const day = date.getDate();
    const dayStr = day > 9 ? `${day}` : `0${day}`;
    const timeStr = startRange ? "00:00:00" : "23:59:00";
    const str = `${date.getFullYear()}-${monthStr}-${dayStr}T${timeStr}`;
    return str;
  },

  sanitizePhoneNumber: (phone: string) => {
    // remove all spaces
    return phone.replace(/\s/g, "");
  },

  getRouteBounds: (
    startLatLng: ILatLngCoordinate,
    endLatLng: ILatLngCoordinate,
    // radius of search in KM
    radius: number
  ) => {
    const dX = endLatLng.lat - startLatLng.lat;
    const dY = endLatLng.lng - startLatLng.lng;

    const Lx = dY / Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    const Ly = -dX / Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
    const R = radius / 111.32;
    const bound1 = {
      lat: startLatLng.lat + R * Lx,
      lng: startLatLng.lng + R * Ly,
    };
    const bound2 = {
      lat: startLatLng.lat - R * Lx,
      lng: startLatLng.lng - R * Ly,
    };
    const bound3 = { lat: bound1.lat + dX, lng: bound1.lng + dY };
    const bound4 = { lat: bound2.lat + dX, lng: bound2.lng + dY };

    const bounds = [bound2, bound1, bound3, bound4];
    return bounds;
  },

  delay: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  formatKM: (kilometers: number, locale: string) => {
    return new Intl.NumberFormat(locale, {
      style: "unit",
      maximumFractionDigits: 1,
      unit: "kilometer",
      unitDisplay: "short",
    }).format(kilometers);
  },

  formatMinutes: (minutes: number, t: TFunction) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${+remainingMinutes.toFixed(0)}мин`;
  },
};

export default utils;
