import axiosInstance from "@/services/axios.instance";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { IPlaceSlug } from "@/services/places-service/place-slug.interface";

const placesService = {
  getAllPlaces: (langId: number) => {
    return axiosInstance.get<ISearchPlace[]>(`/places?lang=${langId}`);
  },

  getPlacesSlugs: () => {
    return axiosInstance.get<IPlaceSlug[]>("/places/slugs");
  },
};

export default placesService;
