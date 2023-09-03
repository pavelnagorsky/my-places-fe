import RolesEnum from "@/services/auth-service/roles.enum";

export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ITokenResponse {
  token: string;
}

export interface ISignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IRole {
  id: number;
  name: RolesEnum;
}

export enum LoginErrorEnum {
  INVALID_DATA = "INVALID_DATA",
  EMAIL_NOT_CONFIRMED = "EMAIL_NOT_CONFIRMED",
}
