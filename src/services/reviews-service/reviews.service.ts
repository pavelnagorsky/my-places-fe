import axiosInstance from "@/services/axios.instance";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { ICreateReview } from "@/services/reviews-service/interfaces/create-review.interface";
import {
  IMyReviewsRequest,
  IMyReviewsResponse,
  ISearchReviewsResponse,
} from "@/services/reviews-service/interfaces/interfaces";
import { IReview } from "@/services/reviews-service/interfaces/review.interface";

const reviewsService = {
  creteReview: (payload: ICreateReview, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<{ id: number }>(
      `/Reviews?lang=${langId}`,
      payload
    );
  },

  RESULTS_PER_REQUEST: 3,

  getPlaceReviews: (placeId: number, language: string, lastIndex: number) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.get<ISearchReviewsResponse>(
      `/Reviews/place/${placeId}?lang=${langId}&lastIndex=${lastIndex}&itemsPerPage=${reviewsService.RESULTS_PER_REQUEST}`
    );
  },

  getReviewById: (reviewId: number, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.get<IReview>(`/Reviews/${reviewId}?lang=${langId}`);
  },

  MY_REVIEWS_ITEMS_PER_PAGE: 6,

  getMyReviews: (lang: string, payload: IMyReviewsRequest) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IMyReviewsResponse>(
      `/reviews/my-reviews?lang=${langId}`,
      payload
    );
  },

  deleteReview: (id: number) => {
    return axiosInstance.delete(`/reviews/${id}`);
  },
};

export default reviewsService;
