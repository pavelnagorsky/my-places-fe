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
  getAllAdmin: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlaceCategory[]>(
      `/placeCategories/administration?lang=${langId}`
    );
  },
  getOneAdmin: (id: number | string) => {
    return axiosInstance.get<IPlaceCategoryAdmin>(
      `/placeCategories/${id}/administration`
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
      `/placeCategories/${id}/administration`,
      dto
    );
  },
  deleteAdmin: (id: number | string) => {
    return axiosInstance.delete<{ id: number }>(
      `/placeCategories/${id}/administration`
    );
  },
};

export default placeCategoriesService;
