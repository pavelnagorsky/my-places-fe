import { ICreateRoute } from "@/services/routes-service/interfaces/create-route.interface";
import axiosInstance from "@/services/axios.instance";
import { IMyRoutesRequest } from "@/services/routes-service/interfaces/interfaces";
import parseLanguageToId from "@/shared/parseLanguageToId";
import { IPaginationResponse } from "@/services/interfaces";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import { IUpdateRoute } from "@/services/routes-service/interfaces/update-route.interface";

const routesService = {
  createRoute: (payload: ICreateRoute) => {
    return axiosInstance.post<{ id: number }>(`/Routes`, payload);
  },

  updateRoute: (payload: IUpdateRoute) => {
    return axiosInstance.put<{ id: number }>(`/Routes/${payload.id}`, payload);
  },

  getMyRoutes: (payload: IMyRoutesRequest, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.post<IPaginationResponse<IRoute>>(
      `/routes/my-routes`,
      payload,
      {
        params: {
          lang: langId,
        },
      }
    );
  },

  MY_ROUTES_ITEMS_PER_PAGE: 15,

  delete: (id: number) => {
    return axiosInstance.delete<{ id: number }>(`/Routes/${id}`);
  },

  getRoute: (id: number, lang: string) => {
    const langId = parseLanguageToId(lang);
    return axiosInstance.get<IRoute>(`/Routes/${id}`, {
      params: {
        lang: langId,
      },
    });
  },
};

export default routesService;
