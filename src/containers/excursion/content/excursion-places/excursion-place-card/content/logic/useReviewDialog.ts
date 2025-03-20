import { useState } from "react";
import { IReview } from "@/services/reviews-service/interfaces/review.interface";
import useDialog from "@/hooks/useDialog";
import reviewsService from "@/services/reviews-service/reviews.service";
import { useTranslation } from "next-i18next";

const useReviewDialog = () => {
  const { i18n } = useTranslation();
  const [review, setReview] = useState<IReview | null>(null);
  const dialog = useDialog();

  const handleLoadReview = (reviewId: number) => {
    dialog.handleOpen();
    reviewsService
      .getReviewById(reviewId, i18n.language)
      .then(({ data }) => {
        setReview(data);
      })
      .catch(() => {
        setReview(null);
        dialog.handleClose();
      });
  };

  const onCloseReview = () => {
    dialog.handleClose();
    setReview(null);
  };

  return { handleLoadReview, dialog, review, onCloseReview };
};

export default useReviewDialog;
