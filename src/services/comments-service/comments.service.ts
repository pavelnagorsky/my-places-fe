import axiosInstance from "@/services/axios.instance";
import { IComment } from "@/services/comments-service/comment.interface";
import {
  ICreateCommentPayload,
  IUpdateCommentPayload,
} from "@/services/comments-service/interfaces";

const commentsService = {
  getPlaceComments: (placeId: number) => {
    return axiosInstance.get<IComment[]>(`/comments/places/${placeId}`);
  },

  addComment: (payload: ICreateCommentPayload) => {
    return axiosInstance.post<IComment>(
      `/comments/places/${payload.placeId}`,
      payload
    );
  },

  deleteComment: (commentId: number) => {
    return axiosInstance.delete(`/comments/${commentId}`);
  },

  updateComment: (payload: IUpdateCommentPayload) => {
    return axiosInstance.put<IComment>(
      `/comments/${payload.commentId}`,
      payload
    );
  },
};

export default commentsService;
