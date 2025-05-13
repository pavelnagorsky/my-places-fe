import { ISearchReview } from "@/services/reviews-service/interfaces/interfaces";
import { useEffect, useState } from "react";
import reviewsService from "@/services/reviews-service/reviews.service";
import { useTranslation } from "next-i18next";
import { IPaginationResponse } from "@/services/interfaces";
import utils from "@/shared/utils";

interface IUseReviewsProps {
  defaultData: IPaginationResponse<ISearchReview>;
  placeSlug: string;
}

const useReviews = ({ defaultData, placeSlug }: IUseReviewsProps) => {
  const { i18n } = useTranslation();
  const [reviews, setReviews] = useState<ISearchReview[]>(
    defaultData.items || []
  );
  const [hasMore, setHasMore] = useState<boolean>(
    defaultData.totalItems > defaultData.items.length
  );
  useEffect(() => {
    if (!defaultData.items.length) return;
    setReviews(defaultData.items);
  }, [i18n.language]);

  const handleSearch = () => {
    reviewsService
      .getPlaceReviews(
        placeSlug,
        i18n.language,
        utils.calculateCurrentScrollPage(
          reviews.length,
          reviewsService.RESULTS_PER_REQUEST
        )
      )
      .then(({ data }) => {
        const newReviews = reviews.concat(data.items);
        setReviews(newReviews);
        setHasMore(data.totalItems > newReviews.length);
      })
      .catch(() => {
        setHasMore(false);
      });
  };

  return {
    reviews,
    hasMore,
    handleSearch,
  };
};

export default useReviews;
