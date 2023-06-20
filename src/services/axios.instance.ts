import axios from "axios";
import { Environment } from "../shared/Environment";

const instance = axios.create({
  baseURL: Environment.backendBaseUrl,
});

// instance.interceptors.request.use(req => {
//   const token = localStorage.getItem(localStorageFields.TOKEN);
//   //@ts-ignore
//   if (!req) req = {};
//   //@ts-ignore
//   if (!req.headers) req.headers = {};
//   req.headers.Authorization = token ? `Bearer ${token}` : '';
//   return req;
// });

export default instance;
