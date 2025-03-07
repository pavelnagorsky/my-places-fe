import axiosInstance from "@/services/axios.instance";
import { ICreateExcursion } from "@/services/excursions-service/interfaces/create-excursion.interface";
import { IUpdateExcursion } from "@/services/excursions-service/interfaces/update-excursion.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";

const excursionsService = {
  createExcursion: (payload: ICreateExcursion, language: string) => {
    return axiosInstance.post<{ id: number }>(`/Excursions`, payload, {
      params: { lang: parseLanguageToId(language) },
    });
  },

  updateExcursion: (payload: IUpdateExcursion, language: string) => {
    return axiosInstance.put<{ id: number }>(
      `/Excursions/${payload.id}`,
      payload,
      { params: { lang: parseLanguageToId(language) } }
    );
  },
};

export default excursionsService;
