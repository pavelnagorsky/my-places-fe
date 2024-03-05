import axiosInstance from "@/services/axios.instance";
import { ICreateFeedbackRequest } from "@/services/contact-service/interfaces/create-feedback.interface";
import { IFeedbackListRequest } from "@/services/contact-service/interfaces/interfaces";
import { CrmStatusesEnum, IPaginationResponse } from "@/services/interfaces";
import { IFeedback } from "@/services/contact-service/interfaces/feedback.interface";

const contactService = {
  create: (payload: ICreateFeedbackRequest) => {
    return axiosInstance.post(`/feedback`, payload);
  },

  getList: (payload: IFeedbackListRequest) => {
    return axiosInstance.post<IPaginationResponse<IFeedback>>(
      "/feedback/list",
      payload
    );
  },

  getOneById: (id: number | string) => {
    return axiosInstance.get<IFeedback>(`/feedback/${id}`);
  },

  updateStatus: (id: number | string, status: CrmStatusesEnum) => {
    return axiosInstance.put(`/feedback/${id}`, {
      status: status,
    });
  },
};

export default contactService;
