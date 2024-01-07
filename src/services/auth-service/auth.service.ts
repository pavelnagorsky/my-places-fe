import {
  ILoginRequest,
  ISignupRequest,
  ITokenResponse,
} from "@/services/auth-service/interfaces";
import axiosInstance from "@/services/axios.instance";

const authService = {
  login: (payload: ILoginRequest) => {
    return axiosInstance.post<ITokenResponse>("/auth/login", payload);
  },
  signup: (payload: ISignupRequest) => {
    return axiosInstance.post("/auth/register", payload);
  },
};

export default authService;
