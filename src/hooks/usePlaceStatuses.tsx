import { PlaceStatusesEnum } from "@/services/places-service/interfaces/place-statuses.enum";
import { ISelect } from "@/shared/interfaces";

const usePlaceStatuses = () => {
  const statuses: ISelect[] = [
    { id: PlaceStatusesEnum.MODERATION, label: "На модерации" },
    { id: PlaceStatusesEnum.APPROVED, label: "Опубликовано" },
    { id: PlaceStatusesEnum.REJECTED, label: "Отклонено" },
    { id: PlaceStatusesEnum.NEEDS_PAYMENT, label: "Ожидает оплаты" },
    { id: PlaceStatusesEnum.COMMERCIAL_EXPIRED, label: "Срок оплаты истек" },
  ];

  return statuses;
};

export default usePlaceStatuses;
