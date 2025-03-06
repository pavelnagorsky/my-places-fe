import axiosInstance from "@/services/axios.instance";
import { ICreateExcursion } from "@/services/excursions-service/interfaces/create-excursion.interface";
import { IUpdateExcursion } from "@/services/excursions-service/interfaces/update-excursion.interface";

const excursionsService = {
  createExcursion: (payload: ICreateExcursion) => {
    return axiosInstance.post<{ id: number }>(`/Excursions`, payload);
  },

  updateExcursion: (payload: IUpdateExcursion) => {
    return axiosInstance.put<{ id: number }>(
      `/Excursions/${payload.id}`,
      payload
    );
  },
};

export default excursionsService;
