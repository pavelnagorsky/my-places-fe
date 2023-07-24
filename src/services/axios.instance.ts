import axios from "axios";
import { Environment } from "../shared/Environment";
import localStorageFields from "@/shared/localStorageFields";

const instance = axios.create({
  baseURL: Environment.backendBaseUrl,
});

instance.interceptors.request.use((req) => {
  if (typeof window === "undefined") return req;
  const token = localStorage.getItem(localStorageFields.TOKEN);
  req.headers.Authorization = token ? `Bearer ${token}` : "";
  return req;
});

export default instance;
