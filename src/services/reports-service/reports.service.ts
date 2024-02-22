import {
  ICreateReport,
  IGetReportsRequest,
  IGetReportsResponse,
} from "@/services/reports-service/interfaces/interfaces";
import axiosInstance from "@/services/axios.instance";
import { CrmStatusesEnum } from "@/shared/interfaces";

const reportsService = {
  createReport: (data: ICreateReport) => {
    return axiosInstance.post("/Reports", data);
  },

  REPORTS_ITEMS_PER_PAGE: 12,

  getReports: (payload: IGetReportsRequest) => {
    return axiosInstance.post<IGetReportsResponse>("/Reports/List", payload);
  },

  changeStatus: (id: number, status: CrmStatusesEnum) => {
    return axiosInstance.put(`/Reports/${id}`, { status });
  },
};

export default reportsService;
