import { IMyPlacesFormContext } from "@/containers/personal-area/my-places/interfaces";
import { ISelect } from "@/shared/interfaces";

export interface IAdminPlacesFormContext extends IMyPlacesFormContext {
  users: ISelect[];
}
