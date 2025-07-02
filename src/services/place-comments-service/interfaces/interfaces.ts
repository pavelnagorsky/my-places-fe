export interface ICreatePlaceCommentPayload {
  text: string;
  placeId: number;
}

export interface IUpdateCommentPayload {
  text: string;
  commentId: number;
}
