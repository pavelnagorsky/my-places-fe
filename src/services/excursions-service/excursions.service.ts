import axiosInstance from "@/services/axios.instance";
import { ICreateExcursion } from "@/services/excursions-service/interfaces/create-excursion.interface";
import { IUpdateExcursion } from "@/services/excursions-service/interfaces/update-excursion.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { IPaginationResponse } from "@/services/interfaces";
import {
  IAdminExcursionsRequest,
  IModerationExcursionsRequest,
  IMyExcursionsRequest,
  ISearchExcursionsRequest,
} from "@/services/excursions-service/interfaces/interfaces";
import { IExcursionListItem } from "@/services/excursions-service/interfaces/excursion-list-item.interface";
import { IExcursion } from "@/services/excursions-service/interfaces/excursion.interface";
import { ISlug } from "@/services/places-service/interfaces/place-slug.interface";
import { IExcursionModerationItem } from "@/services/excursions-service/interfaces/excursion-moderation-item.interface";
import { IModeration } from "@/services/places-service/interfaces/moderation.interface";
import { ICreateSlug } from "@/services/places-service/interfaces/create-slug.interface";
import { IChangeExcursionStatus } from "@/services/excursions-service/interfaces/change-excursion-status.interface";
import { IExcursionSearchItem } from "@/services/excursions-service/interfaces/excursion-search-item.interface";

const excursionsService = {
  createExcursion: (payload: ICreateExcursion, language: string) => {
    return axiosInstance.post<{ id: number }>(`/Excursions`, payload, {
      params: { lang: parseLanguageToId(language) },
    });
  },

  updateExcursion: (payload: IUpdateExcursion, language: string) => {
    return axiosInstance.put<{ id: number }>(
      `/Excursions/${payload.id}`,
      payload,
      { params: { lang: parseLanguageToId(language) } }
    );
  },

  getMyExcursions: (payload: IMyExcursionsRequest, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IExcursionListItem>>(
      `/excursions/personal-list`,
      payload,
      {
        params: {
          lang: langId,
        },
      }
    );
  },

  MY_EXCURSIONS_ITEMS_PER_PAGE: 15,

  getExcursionById: (id: number, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IExcursion>(`/Excursions/${id}`, {
      params: {
        lang: langId,
      },
    });
  },

  getExcursionBySlug: (slug: string, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IExcursion>(`/Excursions/Slug/${slug}`, {
      params: {
        lang: langId,
      },
    });
  },

  delete: (id: number) => {
    return axiosInstance.delete(`/Excursions/${id}`);
  },

  getSlugs: () => {
    return axiosInstance.get<ISlug[]>("/Excursions/Slugs");
  },

  getModerationExcursions: (
    payload: IModerationExcursionsRequest,
    lang: string
  ) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IExcursionModerationItem>>(
      `/excursions/moderation-list?lang=${langId}`,
      payload
    );
  },

  MODERATION_EXCURSIONS_ITEMS_PER_PAGE: 15,

  moderateExcursion: (id: number, dto: IModeration) => {
    return axiosInstance.post(`/excursions/${id}/moderation`, dto);
  },

  getAdminExcursions: (payload: IAdminExcursionsRequest, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IExcursionListItem>>(
      `/excursions/administration-list?lang=${langId}`,
      payload
    );
  },

  ADMIN_EXCURSIONS_ITEMS_PER_PAGE: 15,

  updateSlug: (id: number, slug: string) => {
    return axiosInstance.put(`/excursions/${id}/slug`, { slug });
  },

  validateSlug: (slugDto: ICreateSlug) => {
    return axiosInstance.post("/excursions/slugs/validate", slugDto);
  },

  changeStatus: (id: number | string, dto: IChangeExcursionStatus) => {
    return axiosInstance.post(`/excursions/${id}/change-status`, dto);
  },

  searchExcursions: (payload: ISearchExcursionsRequest, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IExcursionSearchItem>>(
      `/excursions/search`,
      payload,
      {
        params: {
          lang: langId,
        },
      }
    );
  },

  SEARCH_EXCURSIONS_PER_PAGE: 12,
};

export default excursionsService;
