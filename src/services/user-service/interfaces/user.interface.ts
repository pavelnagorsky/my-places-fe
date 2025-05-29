import { IRole } from "@/services/auth-service/interfaces/interfaces";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  receiveEmails: boolean;
  createdAt: string;
  roles: IRole[];
  preferredLanguage: number | null;
}
