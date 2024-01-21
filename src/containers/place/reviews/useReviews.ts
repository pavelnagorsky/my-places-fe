import {
  ISearchReview,
  ISearchReviewsResponse,
} from "@/services/reviews-service/interfaces/interfaces";
import { useEffect, useState } from "react";
import { IReview } from "@/services/reviews-service/interfaces/review.interface";
import reviewsService from "@/services/reviews-service/reviews.service";
import { useTranslation } from "next-i18next";

interface IUseReviewsProps {
  defaultData: ISearchReviewsResponse;
  placeSlug: string;
}

const useReviews = ({ defaultData, placeSlug }: IUseReviewsProps) => {
  const { i18n } = useTranslation();
  const [reviews, setReviews] = useState<ISearchReview[]>(
    defaultData.data || []
  );
  const [hasMore, setHasMore] = useState<boolean>(defaultData.hasMore);

  useEffect(() => {
    setReviews(defaultData.data);
    setHasMore(defaultData.hasMore);
  }, [defaultData]);

  const handleSearch = () => {
    reviewsService
      .getPlaceReviews(placeSlug, i18n.language, reviews.length)
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
