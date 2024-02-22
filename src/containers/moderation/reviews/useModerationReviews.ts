import { useForm } from "react-hook-form-mui";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { OrderDirectionsEnum } from "@/shared/interfaces";
import {
  IModerationReviewsRequest,
  ModerationReviewsOrderByEnum,
} from "@/services/reviews-service/interfaces/interfaces";
import { IModerationReviewsFormContext } from "@/containers/moderation/reviews/interfaces";
import reviewsService from "@/services/reviews-service/reviews.service";
import { IModerationReview } from "@/services/reviews-service/interfaces/moderation-review.interface";

const useModerationReviews = () => {
  const [reviews, setReviews] = useState<IModerationReview[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [noReviews, setNoReviews] = useState(false);
  const [orderBy, setOrderBy] = useState<ModerationReviewsOrderByEnum>(
    ModerationReviewsOrderByEnum.UPDATED_AT
  );
  const [orderDirection, setOrderDirection] = useState<OrderDirectionsEnum>(
    OrderDirectionsEnum.DESC
  );
  const { i18n } = useTranslation();
  const formContext = useForm<IModerationReviewsFormContext>({
    defaultValues: {
      search: "",
      authorEmail: "",
      dateTo: null,
      dateFrom: null,
    },
  });

  const toggleOrderDirection = () => {
    if (orderDirection === OrderDirectionsEnum.DESC) {
      setOrderDirection(OrderDirectionsEnum.ASC);
    } else {
      setOrderDirection(OrderDirectionsEnum.DESC);
    }
  };

  useEffect(() => {
    onSubmit();
  }, [i18n.language, orderBy, orderDirection]);

  const onSubmit = (fromStart = true) => {
    formContext.handleSubmit((data) => {
      setNoReviews(false);
      setHasMore(true);
      if (fromStart) {
        setReviews([]);
      }
      const payload: IModerationReviewsRequest = {
        search: data.search,
        authorEmail: data.authorEmail,
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
        itemsPerPage: reviewsService.MODERATION_REVIEWS_ITEMS_PER_PAGE,
        lastIndex: fromStart ? 0 : reviews.length,
        orderBy: orderBy,
        orderAsc: orderDirection === OrderDirectionsEnum.ASC,
      };
      reviewsService
        .getModerationReviews(i18n.language, payload)
        .then((res) => {
          const totalReviews = fromStart
            ? res.data.data
            : reviews.concat(res.data.data);
          setNoReviews(totalReviews.length === 0);
          setHasMore(res.data.hasMore);
          setReviews(totalReviews);
        })
        .catch((reason) => {
          setNoReviews(reviews.length === 0);
          setHasMore(false);
        });
    })();
  };

  return {
    formContext,
    onSubmit,
    reviews,
    hasMore,
    orderBy,
    setOrderBy,
    orderDirection,
    toggleOrderDirection,
    noReviews,
  };
};

export default useModerationReviews;
