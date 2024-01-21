import { useAppSelector } from "@/store/hooks";
import { selectUserRoles } from "@/store/user-slice/user.slice";
import RolesEnum from "@/services/auth-service/roles.enum";

const useRoleAccess = (roles: RolesEnum[]) => {
  const userRoles = useAppSelector(selectUserRoles);
  const filteredRoles = userRoles.filter((a) =>
    roles.some((b) => a.name === b)
  );
  return filteredRoles.length > 0;
};

export default useRoleAccess;
