import { IUpdateUser } from "@/services/user-service/update-user.interface";

export interface IUpdateUserFormContext
  extends Omit<IUpdateUser, "preferredLanguageId"> {
  preferredLanguageId: number | "" | undefined;
}
