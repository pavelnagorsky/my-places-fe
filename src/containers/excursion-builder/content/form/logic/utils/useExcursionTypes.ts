import { ExcursionTypesEnum } from "@/services/excursions-service/interfaces/excursion-types.enum";
import { useTranslation } from "next-i18next";

const useExcursionTypes = () => {
  const { t } = useTranslation("excursion-management");
  const options = [
    { id: ExcursionTypesEnum.Overview, label: t("excursionTypes.overview") },
    { id: ExcursionTypesEnum.Region, label: t("excursionTypes.region") },
  ];

  return options;
};

export default useExcursionTypes;
