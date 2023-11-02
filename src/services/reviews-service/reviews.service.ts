import axiosInstance from "@/services/axios.instance";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { ICreateReview } from "@/services/reviews-service/create-review.interface";
import { ISearchReviewsResponse } from "@/services/reviews-service/interfaces";

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
      `/Reviews/${placeId}?lang=${langId}&lastIndex=${lastIndex}&itemsPerPage=${reviewsService.RESULTS_PER_REQUEST}`
    );
  },
};

export default reviewsService;
