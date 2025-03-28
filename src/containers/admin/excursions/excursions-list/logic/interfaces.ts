import { IMyExcursionsFormContext } from "@/containers/personal-area/my-excursions/logic/interfaces";
import { ISelect } from "@/shared/interfaces";

export interface IAdminExcursionsFormContext extends IMyExcursionsFormContext {
  users: ISelect[];
}
