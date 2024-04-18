import { PlaceStatusesEnum } from "@/services/places-service/interfaces/place-statuses.enum";
import { ISelect } from "@/shared/interfaces";
import { useTranslation } from "next-i18next";

const usePlaceStatuses = () => {
  const { t } = useTranslation("common");
  const statuses: ISelect[] = [
    { id: PlaceStatusesEnum.MODERATION, label: t("placeStatuses.moderation") },
    { id: PlaceStatusesEnum.APPROVED, label: t("placeStatuses.approved") },
    { id: PlaceStatusesEnum.REJECTED, label: t("placeStatuses.rejected") },
    {
      id: PlaceStatusesEnum.NEEDS_PAYMENT,
      label: t("placeStatuses.needsPayment"),
    },
    {
      id: PlaceStatusesEnum.COMMERCIAL_EXPIRED,
      label: t("placeStatuses.commercialExpired"),
    },
  ];

  return statuses;
};

export default usePlaceStatuses;
