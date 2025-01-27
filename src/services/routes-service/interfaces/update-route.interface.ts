import { ICreateRoute } from "@/services/routes-service/interfaces/create-route.interface";

export interface IUpdateRoute extends ICreateRoute {
  id: number;
}
