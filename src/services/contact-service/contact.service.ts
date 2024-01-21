import { ICreateFeedbackRequest } from "@/services/contact-service/interfaces";
import axiosInstance from "@/services/axios.instance";

const contactService = {
  create: (payload: ICreateFeedbackRequest) => {
    return axiosInstance.post(`/feedback`, payload);
  },
};

export default contactService;
