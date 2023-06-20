import axiosInstance from "@/services/axios.instance";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";

const placeCategoriesService = {
  getAll: (lang: string) => {
    const langId = 1;
    return axiosInstance.get<IPlaceCategory[]>(
      `/placeCategories?lang=${langId}`
    );
  },
};

export default placeCategoriesService;
