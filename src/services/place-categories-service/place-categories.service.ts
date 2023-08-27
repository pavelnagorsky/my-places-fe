import axiosInstance from "@/services/axios.instance";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";

const placeCategoriesService = {
  getAll: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlaceCategory[]>(
      `/placeCategories?lang=${langId}`
    );
  },
};

export default placeCategoriesService;
