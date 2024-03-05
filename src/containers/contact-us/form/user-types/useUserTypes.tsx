import { UserTypesEnum } from "@/services/contact-service/interfaces/interfaces";

const useUserTypes = () => {
  return [
    { id: UserTypesEnum.PRIVATE, label: "Приватный пользователь" },
    { id: UserTypesEnum.COMPANY, label: "Компания" },
  ];
};

export default useUserTypes;
