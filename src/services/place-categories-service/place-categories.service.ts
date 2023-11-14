import axiosInstance from "@/services/axios.instance";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  ICreatePlaceCategoryAdmin,
  IPlaceCategoryAdmin,
} from "@/services/place-categories-service/interfaces";

const placeCategoriesService = {
  getAll: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlaceCategory[]>(
      `/placeCategories?lang=${langId}`
    );
  },
  getOneAdmin: (id: number | string) => {
    return axiosInstance.get<IPlaceCategoryAdmin>(
      `/placeCategories/administration/${id}`
    );
  },
  createAdmin: (dto: ICreatePlaceCategoryAdmin) => {
    return axiosInstance.post<{ id: number }>(
      `/placeCategories/administration`,
      dto
    );
  },
  updateAdmin: (id: number | string, dto: ICreatePlaceCategoryAdmin) => {
    return axiosInstance.put<{ id: number }>(
      `/placeCategories/administration/${id}`,
      dto
    );
  },
  deleteAdmin: (id: number | string) => {
    return axiosInstance.delete<{ id: number }>(
      `/placeCategories/administration/${id}`
    );
  },
};

export default placeCategoriesService;
