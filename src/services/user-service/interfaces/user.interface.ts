import { IRole } from "@/services/auth-service/interfaces";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isEmailConfirmed: boolean;
  createdAt: string;
  roles: IRole[];
  preferredLanguage: number | null;
}
