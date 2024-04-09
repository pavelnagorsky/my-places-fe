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
  logout: () => {
    return axiosInstance.post("/auth/logout", {}, { withCredentials: true });
  },
  confirmEmail: (token: string) => {
    return axiosInstance.post(
      "/auth/confirm-email",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  resetPasswordRequest: (email: string) => {
    return axiosInstance.post("/auth/reset-password-request", { email });
  },
  resetPassword: (password: string, token: string) => {
    return axiosInstance.post(
      "/auth/reset-password",
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default authService;
