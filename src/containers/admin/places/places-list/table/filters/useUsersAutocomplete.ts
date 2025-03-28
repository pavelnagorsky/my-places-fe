import { useEffect, useState } from "react";
import { IUserSelect } from "@/services/user-service/interfaces/user-select.interface";
import userService from "@/services/user-service/user.service";
import { ISelect } from "@/shared/interfaces";

const useUsersAutocomplete = () => {
  const [users, setUsers] = useState<IUserSelect[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    userService
      .getUsersSelect()
      .then(({ data }) => setUsers(data))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return {
    users: users.map((u) => ({ id: u.id, label: u.userName })) as ISelect[],
    loading,
  };
};

export default useUsersAutocomplete;
