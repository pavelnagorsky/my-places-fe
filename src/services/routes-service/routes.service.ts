import { ICreateRoute } from "@/services/routes-service/interfaces/create-route.interface";
import axiosInstance from "@/services/axios.instance";
import { IMyRoutesRequest } from "@/services/routes-service/interfaces/interfaces";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { IPaginationResponse } from "@/services/interfaces";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";

const reviewsService = {
  createRoute: (payload: ICreateRoute) => {
    return axiosInstance.post<{ id: number }>(`/Routes`, payload);
  },

  getMyRoutes: (payload: IMyRoutesRequest, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IRoute>>(
      `/routes/my-routes?lang=${langId}`,
      payload
    );
  },

  MY_ROUTES_ITEMS_PER_PAGE: 15,
};

export default reviewsService;
