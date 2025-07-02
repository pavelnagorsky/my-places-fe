import axiosInstance from "@/services/axios.instance";
import { ILikeExists } from "@/services/place-likes-service/interfaces";

const placeLikesService = {
  toggleLike: (placeId: number) => {
    return axiosInstance.put(`/place-likes/places/${placeId}`);
  },

  checkLikeExists: (placeId: number) => {
    return axiosInstance.get<ILikeExists>(`/place-likes/places/${placeId}`);
  },
};

export default placeLikesService;
