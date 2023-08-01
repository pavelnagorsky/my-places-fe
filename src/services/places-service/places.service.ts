import axiosInstance from "@/services/axios.instance";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { IPlaceSlug } from "@/services/places-service/place-slug.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  ISearchPlacesRequest,
  ISearchPlacesResponse,
} from "@/services/places-service/interfaces";
import ISelectPlace from "@/services/places-service/select-place.interface";

const placesService = {
  getAllPlaces: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<ISearchPlace[]>(`/places?lang=${langId}`);
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
};

export default placesService;
