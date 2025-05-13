import axiosInstance from "@/services/axios.instance";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { IRegion } from "@/services/regions-service/interfaces/region.interface";
import {
  ICreateRegion,
  IRegionForEdit,
} from "@/services/regions-service/interfaces/interfaces";

const regionsService = {
  getAll: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IRegion[]>(`/regions?lang=${langId}`);
  },
  getAllAdmin: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IRegion[]>(
      `/regions/administration?lang=${langId}`
    );
  },
  getOneAdmin: (id: number | string) => {
    return axiosInstance.get<IRegionForEdit>(`/regions/${id}`);
  },
  create: (dto: ICreateRegion) => {
    return axiosInstance.post<{ id: number }>(`/regions`, dto);
  },
  update: (id: number | string, dto: ICreateRegion) => {
    return axiosInstance.put<{ id: number }>(`/regions/${id}`, dto);
  },
  delete: (id: number | string) => {
    return axiosInstance.delete<{ id: number }>(`/regions/${id}`);
  },
};

export default regionsService;
