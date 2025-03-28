import { ISelect } from "@/shared/interfaces";
import { ReviewStatusesEnum } from "@/services/reviews-service/enums/review-statuses.enum";
import { useTranslation } from "next-i18next";

const useReviewStatuses = () => {
  const { t } = useTranslation("common");
  const statuses: ISelect[] = [
    {
      id: ReviewStatusesEnum.MODERATION,
      label: t("reviewStatuses.moderation"),
    },
    { id: ReviewStatusesEnum.APPROVED, label: t("reviewStatuses.approved") },
    { id: ReviewStatusesEnum.REJECTED, label: t("reviewStatuses.rejected") },
  ];

  return statuses;
};

export default useReviewStatuses;
