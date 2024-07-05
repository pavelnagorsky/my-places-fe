import axiosInstance from "@/services/axios.instance";
import { IPlaceSlug } from "@/services/places-service/interfaces/place-slug.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  IAdminPlacesRequest,
  IModerationPlacesRequest,
  IMyFavouritesRequest,
  IMyPlacesRequest,
} from "@/services/places-service/interfaces/interfaces";
import ISelectPlace from "@/services/places-service/interfaces/select-place.interface";
import { ICreatePlace } from "@/services/places-service/interfaces/create-place.interface";
import { ICreateSlug } from "@/services/places-service/interfaces/create-slug.interface";
import { IPlace } from "@/services/places-service/interfaces/place.interface";
import { IEditPlace } from "@/services/places-service/interfaces/edit-place.interface";
import { IUpdatePlace } from "@/services/places-service/interfaces/update-place.interface";
import { IFavourite } from "@/services/places-service/interfaces/favourite.interface";
import { IModeration } from "@/services/places-service/interfaces/moderation.interface";
import { IModerationPlace } from "@/services/places-service/interfaces/moderation-place.interface";
import { IMyPlace } from "@/services/places-service/interfaces/my-place.interface";
import { IPaginationResponse } from "@/services/interfaces";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { IChangePlaceStatus } from "@/services/places-service/interfaces/change-place-status.interface";
import { ISearchPlacesRequest } from "@/services/search-service/interfaces/interfaces";

const placesService = {
  SEARCH_PLACES_PER_PAGE: 9,

  getPlaceBySlug: (slug: string, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlace>(`/places/slug/${slug}?lang=${langId}`);
  },

  getPlacesSelect: (
    lang: string,
    search: string,
    placeId?: number | string
  ) => {
    const langId = parseLanguageToId(lang);
    const placeIdQuery = placeId ? `&placeId=${placeId}` : "";
    return axiosInstance.get<ISelectPlace[]>(
      `/places/select?lang=${langId}&search=${search}${placeIdQuery}`
    );
  },

  search: (language: string, payload: ISearchPlacesRequest) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<IPaginationResponse<ISearchPlace>>(
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

  MY_PLACES_ITEMS_PER_PAGE: 15,

  getMyPlaces: (lang: string, payload: IMyPlacesRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IMyPlace>>(
      `/places/my-places?lang=${langId}`,
      payload
    );
  },

  getAdminPlaces: (lang: string, payload: IAdminPlacesRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IMyPlace>>(
      `/places/administration-places?lang=${langId}`,
      payload
    );
  },

  getPlaceForEdit: (id: number, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IEditPlace>(`/places/${id}/edit?lang=${langId}`);
  },

  updatePlace: (id: number, payload: IUpdatePlace, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.put(`/places/${id}?lang=${langId}`, payload);
  },

  updatePlaceByAdmin: (id: number, payload: IUpdatePlace, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.put(
      `/places/${id}/administration?lang=${langId}`,
      payload
    );
  },

  updatePlaceSlug: (id: number, slug: string) => {
    return axiosInstance.put(`/places/${id}/slug`, { slug });
  },

  deletePlace: (id: number) => {
    return axiosInstance.delete(`/places/${id}`);
  },

  addPlaceToFavourites: (placeId: number) => {
    return axiosInstance.post(`/favourites/${placeId}/add`);
  },

  getMyFavourites: (payload: IMyFavouritesRequest, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<IFavourite[]>(
      `/favourites?lang=${langId}`,
      payload
    );
  },

  toggleFavouriteIsActual: (id: number) => {
    return axiosInstance.patch(`/favourites/${id}`);
  },

  deleteFavourite: (id: number) => {
    return axiosInstance.delete(`/favourites/${id}`);
  },

  MODERATION_PLACES_ITEMS_PER_PAGE: 15,

  getModerationPlaces: (lang: string, payload: IModerationPlacesRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IModerationPlace>>(
      `/places/moderation-places?lang=${langId}`,
      payload
    );
  },

  getPlaceForModeration: (id: number) => {
    return axiosInstance.get<IEditPlace>(`/places/${id}/moderation`);
  },

  moderatePlace: (id: number, dto: IModeration) => {
    return axiosInstance.post(`/places/${id}/moderation`, dto);
  },

  getPlaceInfoForAdmin: (id: number | string, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.get<IMyPlace>(
      `/places/${id}/administration?lang=${langId}`
    );
  },

  changePlaceStatus: (id: number | string, dto: IChangePlaceStatus) => {
    return axiosInstance.post(
      `/places/${id}/administration/change-status`,
      dto
    );
  },

  safelyDeletePlace: (id: number | string, newPlaceIdForReviews?: number) => {
    const query = newPlaceIdForReviews
      ? `?newPlaceId=${newPlaceIdForReviews}`
      : "";
    return axiosInstance.delete(
      `/places/${id}/administration/safe-delete${query}`
    );
  },
};

export default placesService;
