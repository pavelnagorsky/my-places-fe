import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
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

const useMyReviews = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

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
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
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
          showAlert({
            alertProps: {
              title: "Успех!",
              description: "Заметка была успешно удалена.",
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
          showAlert({
            alertProps: {
              title: "Ошибка!",
              description:
                "Не удалось удалить заметку. Проверьте введенные данные и сетевое подключение или обратитесь в нашу службу поддержки...",
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
