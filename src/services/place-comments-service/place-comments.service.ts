import axiosInstance from "@/services/axios.instance";
import { IComment } from "@/services/place-comments-service/interfaces/comment.interface";
import {
  ICreatePlaceCommentPayload,
  IUpdateCommentPayload,
} from "@/services/place-comments-service/interfaces/interfaces";

const placeCommentsService = {
  getComments: (placeId: number) => {
    return axiosInstance.get<IComment[]>(`/place-comments/places/${placeId}`);
  },

  addComment: (payload: ICreatePlaceCommentPayload) => {
    return axiosInstance.post<IComment>(
      `/place-comments/places/${payload.placeId}`,
      payload
    );
  },

  deleteComment: (commentId: number) => {
    return axiosInstance.delete(`/place-comments/${commentId}`);
  },

  updateComment: (payload: IUpdateCommentPayload) => {
    return axiosInstance.put<IComment>(
      `/place-comments/${payload.commentId}`,
      payload
    );
  },
};

export default placeCommentsService;
