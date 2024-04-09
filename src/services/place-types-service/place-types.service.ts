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
  getAllAdmin: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlaceType[]>(
      `/placeTypes/administration?lang=${langId}`
    );
  },
  getOneAdmin: (id: number | string) => {
    return axiosInstance.get<IPlaceTypeAdmin>(
      `/placeTypes/${id}/administration`
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
      `/placeTypes/${id}/administration`,
      dto
    );
  },
  deleteAdmin: (id: number | string) => {
    return axiosInstance.delete<{ id: number }>(
      `/placeTypes/${id}/administration`
    );
  },
};

export default placeTypesService;
