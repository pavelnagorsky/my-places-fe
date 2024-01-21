import { useForm } from "react-hook-form-mui";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import placesService from "@/services/places-service/places.service";
import { OrderDirectionsEnum } from "@/shared/interfaces";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import { IMyReview } from "@/services/reviews-service/interfaces/my-review.interface";
import {
  IMyReviewsRequest,
  MyReviewsOrderByEnum,
} from "@/services/reviews-service/interfaces/interfaces";
import { IMyReviewsFormContext } from "@/containers/personal-area/my-reviews/interfaces";
import reviewsService from "@/services/reviews-service/reviews.service";

const useMyReviews = () => {
  const [reviews, setReviews] = useState<IMyReview[]>([]);
  const dispatch = useAppDispatch();
  const [lastIndex, setLastIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [noReviews, setNoReviews] = useState(false);
  const [orderBy, setOrderBy] = useState<MyReviewsOrderByEnum>(
    MyReviewsOrderByEnum.CREATED_AT
  );
  const [orderDirection, setOrderDirection] = useState<OrderDirectionsEnum>(
    OrderDirectionsEnum.DESC
  );
  const { i18n } = useTranslation();
  const formContext = useForm<IMyReviewsFormContext>({
    defaultValues: {
      search: "",
      statuses: [],
      dateTo: null,
      dateFrom: null,
    },
  });

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
        const filteredReviews = reviews.filter((r) => r.id !== reviewId);
        setReviews(filteredReviews);
        if (filteredReviews.length === 0) {
          setNoReviews(true);
        }
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
    setNoReviews(false);
    formContext.handleSubmit((data) => {
      if (fromStart) {
        setReviews([]);
        setLastIndex(0);
      }
      const payload: IMyReviewsRequest = {
        search: data.search,
        statuses: (data.statuses || []).map((sId) => +sId),
        dateFrom: data.dateFrom ? new Date(data.dateFrom).toISOString() : null,
        dateTo: data.dateTo ? new Date(data.dateTo).toISOString() : null,
        itemsPerPage: placesService.MY_PLACES_ITEMS_PER_PAGE,
        lastIndex: fromStart ? 0 : lastIndex,
        orderBy: orderBy,
        orderAsc: orderDirection === OrderDirectionsEnum.ASC,
      };
      reviewsService
        .getMyReviews(i18n.language, payload)
        .then((res) => {
          const totalReviews = fromStart
            ? res.data.data
            : reviews.concat(res.data.data);
          setNoReviews(totalReviews.length === 0);
          setHasMore(res.data.hasMore);
          setLastIndex(totalReviews.length);
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
    lastIndex,
    orderBy,
    setOrderBy,
    orderDirection,
    toggleOrderDirection,
    noReviews,
    handleDelete,
  };
};

export default useMyReviews;
