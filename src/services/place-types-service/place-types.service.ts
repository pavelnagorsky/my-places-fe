import axiosInstance from "@/services/axios.instance";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";
import {
  ICreatePlaceTypeAdmin,
  IPlaceTypeAdmin,
} from "@/services/place-types-service/interfaces";

const placeTypesService = {
  getAll: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlaceType[]>(`/placeTypes?lang=${langId}`);
  },
  getOneAdmin: (id: number | string) => {
    return axiosInstance.get<IPlaceTypeAdmin>(
      `/placeTypes/administration/${id}`
    );
  },
  createAdmin: (dto: ICreatePlaceTypeAdmin) => {
    return axiosInstance.post<{ id: number }>(
      `/placeTypes/administration`,
      dto
    );
  },
  updateAdmin: (id: number | string, dto: ICreatePlaceTypeAdmin) => {
    return axiosInstance.put<{ id: number }>(
      `/placeTypes/administration/${id}`,
      dto
    );
  },
  deleteAdmin: (id: number | string) => {
    return axiosInstance.delete<{ id: number }>(
      `/placeTypes/administration/${id}`
    );
  },
};

export default placeTypesService;
