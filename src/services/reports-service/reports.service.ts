import { ICreateReport } from "@/services/reports-service/interfaces";
import axiosInstance from "@/services/axios.instance";

const reportsService = {
  createReport: (data: ICreateReport) => {
    return axiosInstance.post("/Reports", data);
  },
};

export default reportsService;
