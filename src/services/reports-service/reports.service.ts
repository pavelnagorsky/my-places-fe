import {
  ICreateReport,
  IGetReportsRequest,
} from "@/services/reports-service/interfaces/interfaces";
import axiosInstance from "@/services/axios.instance";
import { IReport } from "@/services/reports-service/interfaces/report.interface";
import { CrmStatusesEnum, IPaginationResponse } from "@/services/interfaces";

const reportsService = {
  createReport: (data: ICreateReport) => {
    return axiosInstance.post("/Reports", data);
  },

  REPORTS_ITEMS_PER_PAGE: 15,

  getReports: (payload: IGetReportsRequest) => {
    return axiosInstance.post<IPaginationResponse<IReport>>(
      "/Reports/List",
      payload
    );
  },

  changeStatus: (id: number, status: CrmStatusesEnum) => {
    return axiosInstance.put(`/Reports/${id}`, { status });
  },
};

export default reportsService;
