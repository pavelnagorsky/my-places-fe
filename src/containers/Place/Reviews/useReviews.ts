import { ISearchReviewsResponse } from "@/services/reviews-service/interfaces";
import { useState } from "react";
import { IReview } from "@/services/reviews-service/review.interface";
import reviewsService from "@/services/reviews-service/reviews.service";
import { useTranslation } from "next-i18next";

interface IUseReviewsProps {
  defaultData: ISearchReviewsResponse;
  placeId: number;
}

const useReviews = ({ defaultData, placeId }: IUseReviewsProps) => {
  const { i18n } = useTranslation();
  const [reviews, setReviews] = useState<IReview[]>(defaultData.data || []);
  const [hasMore, setHasMore] = useState<boolean>(defaultData.hasMore);

  const handleSearch = () => {
    reviewsService
      .getPlaceReviews(placeId, i18n.language, reviews.length)
      .then(({ data }) => {
        const newReviews = reviews.concat(data.data);
        setReviews(newReviews);
        setHasMore(data.hasMore);
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
