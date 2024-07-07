import axiosInstance from "@/services/axios.instance";
import { IUser } from "@/services/user-service/interfaces/user.interface";
import { IUpdateUser } from "@/services/user-service/interfaces/update-user.interface";
import { IUsersRequest } from "@/services/user-service/interfaces/interfaces";
import { IPaginationResponse } from "@/services/interfaces";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import { IModerator } from "@/services/user-service/interfaces/moderator.interface";
import { ISaveModerator } from "@/services/user-service/interfaces/save-moderator.interface";
import { IBlockUser } from "@/services/user-service/interfaces/block-user.interface";
import { IEmail } from "@/services/user-service/interfaces/email.interface";
import { ISelect } from "@/shared/interfaces";
import { IUserSelect } from "@/services/user-service/interfaces/user-select.interface";

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

  getUsersSelect: () => {
    return axiosInstance.get<IUserSelect[]>(`/users/all`);
  },

  getUserDataForAdmin: (id: number | string) => {
    return axiosInstance.get<IUserShortInfo>(`/users/${id}`);
  },

  getModeratorDataForAdmin: (id: number | string) => {
    return axiosInstance.get<IModerator>(`/users/${id}/moderator`);
  },

  saveModerator: (id: number | string, payload: ISaveModerator) => {
    return axiosInstance.put(`/users/${id}/moderator`, payload);
  },

  deleteModerator: (id: number | string) => {
    return axiosInstance.delete(`/users/${id}/moderator`);
  },

  blockUser: (id: string | number, payload: IBlockUser) => {
    return axiosInstance.post(`/users/${id}/block`, payload);
  },

  unblockUser: (id: string | number) => {
    return axiosInstance.post(`/users/${id}/unblock`, {});
  },

  sendEmail: (payload: IEmail) => {
    return axiosInstance.post("/users/email", payload);
  },
};

export default userService;
