import axiosInstance from "@/services/axios.instance";
import { IUser } from "@/services/user-service/interfaces/user.interface";
import { IUpdateUser } from "@/services/user-service/interfaces/update-user.interface";
import { IUsersRequest } from "@/services/user-service/interfaces/interfaces";
import { IPaginationResponse } from "@/services/interfaces";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import { IModerator } from "@/services/user-service/interfaces/moderator.interface";

const userService = {
  getUserData: () => {
    return axiosInstance.get<IUser>("/users/userData");
  },

  updateUser: (payload: IUpdateUser) => {
    return axiosInstance.put(`/users`, payload);
  },

  getUsersList: (payload: IUsersRequest) => {
    return axiosInstance.post<IPaginationResponse<IUserShortInfo>>(
      "/users/list",
      payload
    );
  },

  getUserDataForAdmin: (id: number | string) => {
    return axiosInstance.get<IUserShortInfo>(`/users/${id}`);
  },

  getModeratorDataForAdmin: (id: number | string) => {
    return axiosInstance.get<IModerator>(`/users/${id}/moderator`);
  },
};

export default userService;
