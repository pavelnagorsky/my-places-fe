import axiosInstance from "@/services/axios.instance";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { ICreateReview } from "@/services/reviews-service/interfaces/create-review.interface";
import {
  IAdministrationReviewsRequest,
  IModerationReviewsRequest,
  IMyReviewsRequest,
  ISearchReview,
} from "@/services/reviews-service/interfaces/interfaces";
import { IReview } from "@/services/reviews-service/interfaces/review.interface";
import { IUpdateReview } from "@/services/reviews-service/interfaces/update-review.interface";
import { IEditReview } from "@/services/reviews-service/interfaces/edit-review.interface";
import { IModeration } from "@/services/places-service/interfaces/moderation.interface";
import { IMyReview } from "@/services/reviews-service/interfaces/my-review.interface";
import { IModerationReview } from "@/services/reviews-service/interfaces/moderation-review.interface";
import { IPaginationResponse } from "@/services/interfaces";

const reviewsService = {
  creteReview: (payload: ICreateReview, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<{ id: number }>(
      `/Reviews?lang=${langId}`,
      payload
    );
  },

  RESULTS_PER_REQUEST: 3,

  getPlaceReviews: (placeSlug: string, language: string, page: number) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.get<IPaginationResponse<ISearchReview>>(
      `/Reviews/place/${placeSlug}?lang=${langId}&page=${page}&pageSize=${reviewsService.RESULTS_PER_REQUEST}`
    );
  },

  getReviewById: (reviewId: number, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.get<IReview>(`/Reviews/${reviewId}?lang=${langId}`);
  },

  MY_REVIEWS_ITEMS_PER_PAGE: 15,

  getMyReviews: (lang: string, payload: IMyReviewsRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IMyReview>>(
      `/reviews/my-reviews?lang=${langId}`,
      payload
    );
  },

  deleteReview: (id: number) => {
    return axiosInstance.delete(`/reviews/${id}`);
  },

  getReviewForEdit: (id: number, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IEditReview>(`/reviews/${id}/edit?lang=${langId}`);
  },

  updateReview: (id: number, payload: IUpdateReview, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.put(`/reviews/${id}?lang=${langId}`, payload);
  },

  updateReviewByAdmin: (id: number, payload: IUpdateReview, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.put(
      `/reviews/${id}/administration?lang=${langId}`,
      payload
    );
  },

  MODERATION_REVIEWS_ITEMS_PER_PAGE: 15,

  getModerationReviews: (lang: string, payload: IModerationReviewsRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IModerationReview>>(
      `/reviews/moderation-reviews?lang=${langId}`,
      payload
    );
  },

  moderateReview: (id: number, dto: IModeration) => {
    return axiosInstance.post(`/reviews/${id}/moderation`, dto);
  },

  getAdministrationReviews: (
    lang: string,
    payload: IAdministrationReviewsRequest
  ) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IMyReview>>(
      `/reviews/administration-reviews?lang=${langId}`,
      payload
    );
  },
};

export default reviewsService;
