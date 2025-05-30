import {
  ILoginRequest,
  ISignupRequest,
  ITokenResponse,
} from "@/services/auth-service/interfaces/interfaces";
import axiosInstance from "@/services/axios.instance";
import { IGoogleOAuth } from "@/services/auth-service/interfaces/google-oauth.interface";
import { IVKOAuth } from "@/services/auth-service/interfaces/vk-oauth.interface";
import { IYandexOAuth } from "@/services/auth-service/interfaces/yandex-oauth.interface";

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

  googleOAuth: (payload: IGoogleOAuth) => {
    return axiosInstance.post<ITokenResponse>("/auth/google", payload);
  },

  vkOAuth: (payload: IVKOAuth) => {
    return axiosInstance.post<ITokenResponse>("/auth/vk", payload);
  },

  yandexOAuth: (payload: IYandexOAuth) => {
    return axiosInstance.post<ITokenResponse>("/auth/yandex", payload);
  },
};

export default authService;
