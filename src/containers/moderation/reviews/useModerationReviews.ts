import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect } from "react";
import { useTranslation } from "next-i18next";
import {
  IModerationReviewsRequest,
  ModerationReviewsOrderByEnum,
} from "@/services/reviews-service/interfaces/interfaces";
import { IModerationReviewsFormContext } from "@/containers/moderation/reviews/interfaces";
import reviewsService from "@/services/reviews-service/reviews.service";
import { IModerationReview } from "@/services/reviews-service/interfaces/moderation-review.interface";
import useScrollPagination from "@/hooks/useScrollPagination";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";

const useModerationReviews = () => {
  const { i18n } = useTranslation();

  const formContext = useForm<IModerationReviewsFormContext>({
    defaultValues: {
      search: "",
      authorEmail: "",
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<ModerationReviewsOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IModerationReviewsRequest = {
        search: data.search,
        authorEmail: data.authorEmail,
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        ...pagination,
      };
      return reviewsService.getModerationReviews(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = useScrollPagination<
    IModerationReview,
    ModerationReviewsOrderByEnum
  >({
    defaultOrderBy: ModerationReviewsOrderByEnum.UPDATED_AT,
    pageSize: reviewsService.MODERATION_REVIEWS_ITEMS_PER_PAGE,
    apiCall: apiCall,
  });

  const onSubmit = (fromStart = true) => {
    formContext.handleSubmit((data) => {
      paginator.fetch(fromStart);
    })();
  };

  useEffect(() => {
    onSubmit();
  }, [i18n.language, paginator.orderBy, paginator.orderDirection]);

  return {
    formContext,
    onSubmit,
    items: paginator.items,
    hasMore: paginator.hasMore,
    orderBy: paginator.orderBy,
    changeOrderBy: paginator.changeOrderBy,
    orderDirection: paginator.orderDirection,
    toggleOrderDirection: paginator.toggleOrderDirection,
    noItems: paginator.noItems,
  };
};

export default useModerationReviews;
