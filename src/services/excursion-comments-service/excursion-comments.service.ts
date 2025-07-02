import axiosInstance from "@/services/axios.instance";
import { IComment } from "@/services/place-comments-service/interfaces/comment.interface";
import { IUpdateCommentPayload } from "@/services/place-comments-service/interfaces/interfaces";
import { ICreateExcursionCommentPayload } from "@/services/excursion-comments-service/interfaces";

const excursionCommentsService = {
  getComments: (excursionId: number) => {
    return axiosInstance.get<IComment[]>(
      `/excursion-comments/excursions/${excursionId}`
    );
  },

  addComment: (payload: ICreateExcursionCommentPayload) => {
    return axiosInstance.post<IComment>(
      `/excursion-comments/excursions/${payload.excursionId}`,
      payload
    );
  },

  deleteComment: (commentId: number) => {
    return axiosInstance.delete(`/excursion-comments/${commentId}`);
  },

  updateComment: (payload: IUpdateCommentPayload) => {
    return axiosInstance.put<IComment>(
      `/excursion-comments/${payload.commentId}`,
      payload
    );
  },
};

export default excursionCommentsService;
