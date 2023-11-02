export interface ICreateCommentPayload {
  text: string;
  placeId: number;
}

export interface IUpdateCommentPayload {
  text: string;
  commentId: number;
}
