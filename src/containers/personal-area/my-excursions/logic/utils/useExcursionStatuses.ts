import { useTranslation } from "next-i18next";
import { ExcursionStatusesEnum } from "@/services/excursions-service/interfaces/excursion-statuses.enum";

const useExcursionStatuses = () => {
  const { t } = useTranslation("excursion-management");
  const statuses = [
    {
      id: ExcursionStatusesEnum.MODERATION,
      label: t("excursionStatuses.moderation"),
      color: "warning.main",
    },
    {
      id: ExcursionStatusesEnum.APPROVED,
      label: t("excursionStatuses.approved"),
      color: "success.main",
    },
    {
      id: ExcursionStatusesEnum.REJECTED,
      label: t("excursionStatuses.rejected"),
      color: "error.main",
    },
  ];

  return statuses;
};

export default useExcursionStatuses;
