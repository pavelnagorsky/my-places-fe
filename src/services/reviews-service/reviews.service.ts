import axiosInstance from "@/services/axios.instance";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { ICreateReview } from "@/services/reviews-service/create-review.interface";

const reviewsService = {
  creteReview: (payload: ICreateReview, language: string) => {
    const langId = parseLanguageToId(language);
    return axiosInstance.post<{ id: number }>(
      `/Reviews?lang=${langId}`,
      payload
    );
  },
};

export default reviewsService;
