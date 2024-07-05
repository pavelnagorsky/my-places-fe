import { IMyPlacesFormContext } from "@/containers/personal-area/my-places/interfaces";

export interface IAdminPlacesFormContext extends IMyPlacesFormContext {
  userIds: number[];
}
