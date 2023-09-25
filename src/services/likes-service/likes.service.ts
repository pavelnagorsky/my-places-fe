import axiosInstance from "@/services/axios.instance";
import { ILikeExists } from "@/services/likes-service/interfaces";

const likesService = {
  changePlaceLike: (placeId: number) => {
    return axiosInstance.put(`/likes/places/${placeId}`);
  },
  checkPlaceLikeExists: (placeId: number) => {
    return axiosInstance.get<ILikeExists>(`/likes/places/${placeId}`);
  },
};

export default likesService;
