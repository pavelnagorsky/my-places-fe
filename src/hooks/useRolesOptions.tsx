import RolesEnum from "@/services/auth-service/roles.enum";

const useRolesOptions = () => {
  const roles: { id: RolesEnum; label: string }[] = [
    { id: RolesEnum.USER, label: "Пользователь" },
    { id: RolesEnum.MODERATOR, label: "Модератор" },
    { id: RolesEnum.ADMIN, label: "Админ" },
  ];

  return roles;
};

export default useRolesOptions;
