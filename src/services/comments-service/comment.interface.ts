export interface IComment {
  id: number;
  authorUsername: string;
  authorId: number;
  canManage: boolean;
  text: string;
  createdAt: string;
}
