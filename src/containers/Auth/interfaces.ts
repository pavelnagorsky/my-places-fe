import { ISignupRequest } from "@/services/auth-service/interfaces";

export interface ISignupFormContext extends ISignupRequest {
  passwordConfirm: string;
  privacyPolicy: boolean;
}
