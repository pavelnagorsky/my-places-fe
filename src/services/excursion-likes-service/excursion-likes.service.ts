import axiosInstance from "@/services/axios.instance";
import { ILikeExists } from "@/services/place-likes-service/interfaces";

const excursionLikesService = {
  toggleLike: (placeId: number) => {
    return axiosInstance.put(`/excursion-likes/excursions/${placeId}`);
  },

  checkLikeExists: (placeId: number) => {
    return axiosInstance.get<ILikeExists>(
      `/excursion-likes/excursions/${placeId}`
    );
  },
};

export default excursionLikesService;
