import axiosInstance from "@/services/axios.instance";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { IPlaceSlug } from "@/services/places-service/place-slug.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  ISearchPlacesRequest,
  ISearchPlacesResponse,
} from "@/services/places-service/interfaces";
import ISelectPlace from "@/services/places-service/select-place.interface";
import { ICreatePlace } from "@/services/places-service/create-place.interface";
import { ICreateSlug } from "@/services/places-service/create-slug.interface";
import { IPlace } from "@/services/places-service/place.interface";

const placesService = {
  ITEMS_PER_PAGE: 12,

  getAllPlaces: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<ISearchPlace[]>(`/places?lang=${langId}`);
  },

  getPlaceBySlug: (slug: string, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlace>(`/places/${slug}?lang=${langId}`);
  },

  getPlacesSelect: (lang: string, search: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<ISelectPlace[]>(
      `/places/select?lang=${langId}&search=${search}`
    );
  },

  search: (payload: ISearchPlacesRequest) => {
    const langId = parseLanguageToId(payload.language);
    return axiosInstance.post<ISearchPlacesResponse>(
      `/places/search?lang=${langId}`,
      payload
    );
  },

  getPlacesSlugs: () => {
    return axiosInstance.get<IPlaceSlug[]>("/places/slugs");
  },

  validateSlug: (slugDto: ICreateSlug) => {
    return axiosInstance.post("/places/slugs/validate", slugDto);
  },

  createPlace: (payload: ICreatePlace, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<{ id: number }>(
      `/places?lang=${langId}`,
      payload
    );
  },
};

export default placesService;
