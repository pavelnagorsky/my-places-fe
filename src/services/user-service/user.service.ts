import axiosInstance from "@/services/axios.instance";
import { IUser } from "@/services/user-service/user.interface";
import { IUpdateUser } from "@/services/user-service/update-user.interface";

const userService = {
  getUserData: () => {
    return axiosInstance.get<IUser>("/users/userData");
  },

  updateUser: (id: number, payload: IUpdateUser) => {
    return axiosInstance.put(`/users/${id}`, payload);
  },
};

export default userService;
