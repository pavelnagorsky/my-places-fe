import axiosInstance from "@/services/axios.instance";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import parseLanguageToId from "@/shared/parseLanguageToId";

const placeTypesService = {
  getAll: (lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IPlaceType[]>(`/placeTypes?lang=${langId}`);
  },
};

export default placeTypesService;
