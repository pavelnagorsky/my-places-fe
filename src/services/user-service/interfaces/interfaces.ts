import { IPaginationRequest } from "@/services/interfaces";
import RolesEnum from "@/services/auth-service/enums/roles.enum";

export interface IUsersRequest extends IPaginationRequest {
  dateFrom?: string | null;
  dateTo?: string | null;
  email?: string;
  isBlocked?: boolean;
  roles?: RolesEnum[];
}
