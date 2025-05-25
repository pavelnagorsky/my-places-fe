import { IRole } from "@/services/auth-service/interfaces/interfaces";

export interface IUserShortInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  receiveEmails: boolean;
  createdAt: string;
  roles: IRole[];
  language: string | null;
  blockedUntil: null | string;
  blockReason: string | null;
}
