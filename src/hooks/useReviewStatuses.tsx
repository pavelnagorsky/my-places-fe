import { ISelect } from "@/shared/interfaces";
import { ReviewStatusesEnum } from "@/services/reviews-service/interfaces/review-statuses.enum";

const useReviewStatuses = () => {
  const statuses: ISelect[] = [
    { id: ReviewStatusesEnum.MODERATION, label: "На модерации" },
    { id: ReviewStatusesEnum.APPROVED, label: "Опубликовано" },
    { id: ReviewStatusesEnum.REJECTED, label: "Отклонено" },
  ];

  return statuses;
};

export default useReviewStatuses;
