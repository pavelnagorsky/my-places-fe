import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { IMyReview } from "@/services/reviews-service/interfaces/my-review.interface";
import {
  IMyReviewsRequest,
  MyReviewsOrderByEnum,
} from "@/services/reviews-service/interfaces/interfaces";
import { IMyReviewsFormContext } from "@/containers/personal-area/my-reviews/interfaces";
import reviewsService from "@/services/reviews-service/reviews.service";
import useScrollPagination from "@/hooks/useScrollPagination";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";

const useMyReviews = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation(["personal-area", "common"]);

  const formContext = useForm<IMyReviewsFormContext>({
    defaultValues: {
      search: "",
      statuses: [],
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<MyReviewsOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IMyReviewsRequest = {
        search: data.search,
        statuses: (data.statuses || []).map((sId) => +sId),
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        ...pagination,
      };
      return reviewsService.getMyReviews(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = useScrollPagination<IMyReview, MyReviewsOrderByEnum>({
    defaultOrderBy: MyReviewsOrderByEnum.CREATED_AT,
    pageSize: reviewsService.MY_REVIEWS_ITEMS_PER_PAGE,
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

  const handleDelete = (reviewId: number) => {
    reviewsService
      .deleteReview(reviewId)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.success", { ns: "common" }),
              description: t("reviews.feedback.delete.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        const filteredReviews = paginator.items.filter(
          (r) => r.id !== reviewId
        );
        paginator.setItems(filteredReviews);
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: `${t("reviews.feedback.delete.error")} ${t(
                "errors.description",
                {
                  ns: "common",
                }
              )}`,
              variant: "standard",
              severity: "error",
            },
            snackbarProps: {},
          })
        );
      });
  };

  return {
    formContext,
    onSubmit,
    handleDelete,
    items: paginator.items,
    hasMore: paginator.hasMore,
    orderBy: paginator.orderBy,
    changeOrderBy: paginator.changeOrderBy,
    orderDirection: paginator.orderDirection,
    toggleOrderDirection: paginator.toggleOrderDirection,
    noItems: paginator.noItems,
  };
};

export default useMyReviews;
