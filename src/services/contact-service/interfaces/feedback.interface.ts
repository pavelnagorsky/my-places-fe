import { UserTypesEnum } from "@/services/contact-service/interfaces/interfaces";
import { CrmStatusesEnum } from "@/services/interfaces";

export interface IFeedback {
  id: number;

  fullName: string;

  email: string;

  userRequestType: UserTypesEnum;

  phone: string | null;

  message: string;

  status: CrmStatusesEnum;

  createdAt: string;
}
