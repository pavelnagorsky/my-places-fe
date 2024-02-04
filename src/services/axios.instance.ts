import axios, { AxiosRequestConfig } from "axios";
import { Environment } from "../shared/Environment";
import localStorageFields from "@/shared/localStorageFields";

const instance = axios.create({
  baseURL: Environment.backendBaseUrl,
  withCredentials: true,
});

instance.interceptors.request.use((req) => {
  if (typeof window === "undefined") return req;
  const token = localStorage.getItem(localStorageFields.TOKEN);
  req.headers.Authorization = token
    ? `Bearer ${token}`
    : req.headers.Authorization;
  return req;
});

// interceptor with refresh token fallback
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      !!error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post<{ token: string }>(
          "/auth/refresh",
          {},
          { withCredentials: true, baseURL: Environment.backendBaseUrl }
        )
        .then(({ data }) => {
          instance.defaults.headers["Authorization"] = "Bearer " + data.token;
          if (originalRequest.headers) {
            originalRequest.headers["Authorization"] = "Bearer " + data.token;
          } else {
            originalRequest.headers = {};
            originalRequest.headers["Authorization"] = "Bearer " + data.token;
          }
          if (typeof window !== "undefined") {
            localStorage.setItem(localStorageFields.TOKEN, data.token);
          }
          return instance(originalRequest);
        })
        .catch((error) => {
          if (typeof window !== "undefined") {
            localStorage.removeItem(localStorageFields.TOKEN);
          }
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
