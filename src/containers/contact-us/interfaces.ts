import { UserTypesEnum } from "@/services/contact-service/interfaces";

export interface IContactUsForm {
  fullName: string;
  email: string;
  userType: UserTypesEnum;
  phone: string;
  message: string;
}
