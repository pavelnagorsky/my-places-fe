import RolesEnum from "@/services/auth-service/roles.enum";

export interface IUsersFiltersForm {
  dateFrom?: Date | string | null;
  dateTo?: Date | string | null;
  email?: string;
  isBlocked: boolean;
  roles: RolesEnum[];
}
