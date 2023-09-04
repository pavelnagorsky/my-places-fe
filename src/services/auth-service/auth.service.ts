import {
  ILoginRequest,
  ISignupRequest,
  ITokenResponse,
} from "@/services/auth-service/interfaces";
import axiosInstance from "@/services/axios.instance";
import { IUser } from "@/services/auth-service/user.interface";

const authService = {
  login: (payload: ILoginRequest) => {
    return axiosInstance.post<ITokenResponse>("/auth/login", payload);
  },
  signup: (payload: ISignupRequest) => {
    return axiosInstance.post("/auth/register", payload);
  },
  getUserData: () => {
    return axiosInstance.get<IUser>("/users/userData");
  },
};

export default authService;
