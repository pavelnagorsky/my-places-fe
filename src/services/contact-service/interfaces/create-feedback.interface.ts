import { UserTypesEnum } from "@/services/contact-service/interfaces/interfaces";

export interface ICreateFeedbackRequest {
  fullName: string;
  email: string;
  userType: UserTypesEnum;
  phone: string;
  message: string;
}