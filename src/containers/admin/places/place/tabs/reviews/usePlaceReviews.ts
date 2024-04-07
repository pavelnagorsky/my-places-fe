import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form-mui";
import { IPaginationRequest } from "@/services/interfaces";
import usePagination from "@/hooks/usePagination";
import { IAdminReviewsFormContext } from "@/containers/admin/places/place/tabs/reviews/interfaces";
import { useRouter } from "next/router";
import {
  IAdministrationReviewsRequest,
  MyReviewsOrderByEnum,
} from "@/services/reviews-service/interfaces/interfaces";
import reviewsService from "@/services/reviews-service/reviews.service";
import { IMyReview } from "@/services/reviews-service/interfaces/my-review.interface";
import { showAlert } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";

const usePlaceReviews = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const router = useRouter();
  const id = router.query.id;

  const onChangePageSize = (size: number) => {
    setRowsPerPage(size);
  };

  const formContext = useForm<IAdminReviewsFormContext>({
    defaultValues: {
      search: "",
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<MyReviewsOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IAdministrationReviewsRequest = {
        search: data.search,
        placeId: +(id as string),
        ...pagination,
      };
      return reviewsService.getAdministrationReviews(i18n.language, payload);
    },
    [i18n.language]
  );

  const paginator = usePagination<IMyReview, MyReviewsOrderByEnum>({
    defaultOrderBy: MyReviewsOrderByEnum.CREATED_AT,
    pageSize: rowsPerPage,
    apiCall,
    keepItems: true,
  });

  const onSubmit = () => {
    formContext.handleSubmit((data) => {
      paginator.fetch();
    })();
  };

  useEffect(() => {
    onSubmit();
  }, [i18n.language, paginator.orderBy, paginator.orderDirection, rowsPerPage]);

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
    rowsPerPage,
    onSubmit,
    onChangePageSize,
    items: paginator.items,
    orderBy: paginator.orderBy,
    orderDirection: paginator.orderDirection,
    changeOrderBy: paginator.changeOrderBy,
    toggleOrderDirection: paginator.toggleOrderDirection,
    changeCurrentPage: paginator.changeCurrentPage,
    loading: paginator.loading,
    currentPage: paginator.currentPage,
    totalItems: paginator.totalItems,
    totalPages: paginator.totalPages,
    handleDelete,
  };
};

export default usePlaceReviews;
