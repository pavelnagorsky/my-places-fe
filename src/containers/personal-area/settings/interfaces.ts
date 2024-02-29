import { IUpdateUser } from "@/services/user-service/interfaces/update-user.interface";

export interface IUpdateUserFormContext
  extends Omit<IUpdateUser, "preferredLanguageId"> {
  preferredLanguageId: number | "" | undefined;
}
