import axiosInstance from "@/services/axios.instance";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { IPlaceSlug } from "@/services/places-service/place-slug.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  ISearchPlacesRequest,
  ISearchPlacesResponse,
} from "@/services/places-service/interfaces";
import ISelectPlace from "@/services/places-service/select-place.interface";
import { ISearchResultsState } from "@/store/search-results-slice/search-results.slice";

const getSsrSearchResults: (
  locale: string
) => Promise<ISearchResultsState> = async (locale) => {
  try {
    const { data } = await placesService.search({
      searchCoordinates: null,
      radius: 100,
      language: locale,
      itemsPerPage: placesService.ITEMS_PER_PAGE,
      typesIds: [],
      title: "",
      pageToReturn: 1,
    });
    return {
      error: false,
      loading: false,
      places: data.data,
      canRefresh: false,
      pagination: {
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        totalResults: data.totalResults,
      },
    };
  } catch (e) {
    return {
      error: true,
      loading: false,
      places: [],
      canRefresh: false,
      pagination: {
        totalPages: 1,
        currentPage: 1,
        totalResults: 0,
      },
    };
  }
};

const placesService = {
  ITEMS_PER_PAGE: 9,

  getSsrSearchResults,

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

  validateSlug: (slug: string) => {
    return axiosInstance.post("/places/slugs/validate", {
      slug: slug,
    });
  },
};

export default placesService;
