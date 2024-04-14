import { UserTypesEnum } from "@/services/contact-service/interfaces/interfaces";
import { useTranslation } from "next-i18next";

const useUserTypes = () => {
  const { t } = useTranslation("contact-us");

  return [
    { id: UserTypesEnum.PRIVATE, label: t("form.userTypes.private") },
    { id: UserTypesEnum.COMPANY, label: t("form.userTypes.company") },
  ];
};

export default useUserTypes;
