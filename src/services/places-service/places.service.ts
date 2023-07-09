import axiosInstance from "@/services/axios.instance";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { IPlaceSlug } from "@/services/places-service/place-slug.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  ISearchPlacesRequest,
  ISearchPlacesResponse,
} from "@/services/places-service/interfaces";

const placesService = {
  getAllPlaces: (langId: number) => {
    return axiosInstance.get<ISearchPlace[]>(`/places?lang=${langId}`);
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
