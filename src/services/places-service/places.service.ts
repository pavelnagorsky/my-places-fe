import axiosInstance from "@/services/axios.instance";
import { IPlaceSlug } from "@/services/places-service/interfaces/place-slug.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  IModerationPlacesRequest,
  IModerationPlacesResponse,
  IMyFavouritesRequest,
  IMyPlacesRequest,
  IMyPlacesResponse,
  ISearchPlacesRequest,
  ISearchPlacesResponse,
} from "@/services/places-service/interfaces/interfaces";
import ISelectPlace from "@/services/places-service/interfaces/select-place.interface";
import { ICreatePlace } from "@/services/places-service/interfaces/create-place.interface";
import { ICreateSlug } from "@/services/places-service/interfaces/create-slug.interface";
import { IPlace } from "@/services/places-service/interfaces/place.interface";
import { IEditPlace } from "@/services/places-service/interfaces/edit-place.interface";
import { IUpdatePlace } from "@/services/places-service/interfaces/update-place.interface";
import { IFavourite } from "@/services/places-service/interfaces/favourite.interface";
import { IModerationPlace } from "@/services/places-service/interfaces/moderation-place.interface";

const placesService = {
  ITEMS_PER_PAGE: 12,

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

  MY_PLACES_ITEMS_PER_PAGE: 10,

  getMyPlaces: (lang: string, payload: IMyPlacesRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IMyPlacesResponse>(
      `/places/my-places?lang=${langId}`,
      payload
    );
  },

  getPlaceForEdit: (id: number, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IEditPlace>(`/places/edit/${id}?lang=${langId}`);
  },

  updatePlace: (id: number, payload: IUpdatePlace, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.put(`/places/${id}?lang=${langId}`, payload);
  },

  deletePlace: (id: number) => {
    return axiosInstance.delete(`/places/${id}`);
  },

  addPlaceToFavourites: (placeId: number) => {
    return axiosInstance.post(`/favourites/places/${placeId}`);
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

  MODERATION_PLACES_ITEMS_PER_PAGE: 10,

  getModerationPlaces: (lang: string, payload: IModerationPlacesRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IModerationPlacesResponse>(
      `/places/moderation-places?lang=${langId}`,
      payload
    );
  },

  getPlaceForModeration: (id: number) => {
    return axiosInstance.get<IEditPlace>(`/places/moderation/${id}`);
  },
};

export default placesService;
