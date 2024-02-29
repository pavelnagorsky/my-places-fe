import { IPaginationRequest } from "@/services/interfaces";
import RolesEnum from "@/services/auth-service/roles.enum";

export interface IUsersRequest extends IPaginationRequest {
  dateFrom?: string | null;
  dateTo?: string | null;
  email?: string;
  isBlocked?: boolean;
  roles?: RolesEnum[];
}
