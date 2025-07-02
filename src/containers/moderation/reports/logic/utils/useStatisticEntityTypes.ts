import { useTranslation } from "next-i18next";
import { StatisticEntitiesEnum } from "@/services/reports-service/enums";

const useStatisticEntityTypes = () => {
  const { t } = useTranslation("common");

  return [
    {
      id: StatisticEntitiesEnum.Place,
      label: t("entityTypes.place"),
    },
    {
      id: StatisticEntitiesEnum.Excursion,
      label: t("entityTypes.excursion"),
    },
  ];
};

export default useStatisticEntityTypes;
