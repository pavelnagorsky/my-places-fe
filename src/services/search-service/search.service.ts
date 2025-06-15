import {
  ISearchPlacesOptionsRequest,
  ISearchPlacesRequest,
} from "@/services/search-service/interfaces/interfaces";
import parseLanguageToId from "@/shared/parseLanguageToId";
import axiosInstance from "@/services/axios.instance";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { ISearchPlaceOption } from "@/services/search-service/interfaces/search-place-option.interface";

const searchService = {
  SEARCH_PLACES_PER_PAGE: 18,

  search: (language: string, payload: ISearchPlacesRequest) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<IPaginationResponse<ISearchPlace>>(
      `/search?lang=${langId}`,
      payload
    );
  },

  searchByIds: (payload: number[], language: string) => {
    const langId = parseLanguageToId(language);
    const params = new URLSearchParams();

    payload.forEach((id) => params.append("ids", id.toString()));
    params.append("lang", langId.toString());
    return axiosInstance.get<ISearchPlace[]>(`/search/ids`, {
      params,
    });
  },

  searchPlaceOptions: (
    payload: ISearchPlacesOptionsRequest,
    language: string
  ) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<IPaginationResponse<ISearchPlaceOption>>(
      `/search/options?lang=${langId}`,
      payload
    );
  },
};

export default searchService;
