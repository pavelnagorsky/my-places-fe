import axiosInstance from "@/services/axios.instance";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";

const placeTypesService = {
  getAll: (lang: string) => {
    const langId = 1;
    return axiosInstance.get<IPlaceType[]>(`/placeTypes?lang=${langId}`);
  },
};

export default placeTypesService;
