import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";
import parseLanguageToId from "@/shared/parseLanguageToId";
import axiosInstance from "@/services/axios.instance";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";

const searchService = {
  SEARCH_PLACES_PER_PAGE: 12,

  search: (language: string, payload: ISearchPlacesRequest) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<IPaginationResponse<ISearchPlace>>(
      `/search?lang=${langId}`,
      payload
    );
  },

  searchByIds: (payload: number[], language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.get<ISearchPlace[]>(`/search/ids`, {
      params: {
        ids: payload,
        lang: langId,
      },
    });
  },
};

export default searchService;
