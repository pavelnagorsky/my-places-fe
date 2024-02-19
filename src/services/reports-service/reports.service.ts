import {
  ICreateReport,
  IGetReportsRequest,
  IGetReportsResponse,
} from "@/services/reports-service/interfaces/interfaces";
import axiosInstance from "@/services/axios.instance";

const reportsService = {
  createReport: (data: ICreateReport) => {
    return axiosInstance.post("/Reports", data);
  },

  REPORTS_ITEMS_PER_PAGE: 15,

  getReports: (payload: IGetReportsRequest) => {
    return axiosInstance.post<IGetReportsResponse>("/Reports/List", payload);
  },
};

export default reportsService;
