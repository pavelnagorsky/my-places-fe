import { IRole } from "@/services/auth-service/interfaces";

export interface IUserShortInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  createdAt: string;
  roles: IRole[];
  language: string | null;
  blockedUntil: null | string;
  blockReason: string | null;
}
