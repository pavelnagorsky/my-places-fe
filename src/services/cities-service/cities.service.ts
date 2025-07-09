import axiosInstance from "@/services/axios.instance";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { ICity } from "@/services/cities-service/interfaces/city.interface";
import {
  ICityForEdit,
  ICreateCity,
} from "@/services/cities-service/interfaces/interfaces";

const citiesService = {
  getAll: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<ICity[]>(`/cities?lang=${langId}`);
  },
  getAllAdmin: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<ICity[]>(`/cities/administration?lang=${langId}`);
  },
  getOneAdmin: (id: number | string) => {
    return axiosInstance.get<ICityForEdit>(`/cities/${id}`);
  },
  create: (dto: ICreateCity) => {
    return axiosInstance.post<{ id: number }>(`/cities`, dto);
  },
  update: (id: number | string, dto: ICreateCity) => {
    return axiosInstance.put<{ id: number }>(`/cities/${id}`, dto);
  },
  delete: (id: number | string) => {
    return axiosInstance.delete<{ id: number }>(`/cities/${id}`);
  },
};

export default citiesService;
