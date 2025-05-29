import RolesEnum from "@/services/auth-service/enums/roles.enum";

export interface IUsersFiltersForm {
  dateFrom?: Date | string | null;
  dateTo?: Date | string | null;
  email?: string;
  isBlocked: boolean;
  roles: RolesEnum[];
}
