import { useForm } from "react-hook-form-mui";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useAppDispatch } from "@/store/hooks";
import useScrollPagination from "@/hooks/useScrollPagination";
import { IPaginationRequest } from "@/services/interfaces";
import utils from "@/shared/utils";
import { IMyRoutesFormContext } from "@/containers/personal-area/my-routes/interfaces";
import {
  IMyRoutesRequest,
  MyRoutesOrderByEnum,
} from "@/services/routes-service/interfaces/interfaces";
import routesService from "@/services/routes-service/routes.service";
import { IRoute } from "@/services/routes-service/interfaces/route.interface";
import { IMyExcursionsFormContext } from "@/containers/personal-area/my-excursions/logic/interfaces";
import {
  IMyExcursionsRequest,
  MyExcursionsOrderByEnum,
} from "@/services/excursions-service/interfaces/interfaces";
import excursionsService from "@/services/excursions-service/excursions.service";
import { IExcursionListItem } from "@/services/excursions-service/interfaces/excursion-list-item.interface";

const useMyExcursions = () => {
  const { t, i18n } = useTranslation(["personal-area", "common"]);
  const dispatch = useAppDispatch();

  const formContext = useForm<IMyExcursionsFormContext>({
    defaultValues: {
      search: "",
      dateTo: null,
      dateFrom: null,
    },
  });

  const apiCall = useCallback(
    (pagination: IPaginationRequest<MyExcursionsOrderByEnum>) => {
      const data = formContext.getValues();
      const payload: IMyExcursionsRequest = {
        search: data.search,
        dateFrom: data.dateFrom
          ? utils.parseFilterDate(data.dateFrom, true)
          : null,
        dateTo: data.dateTo ? utils.parseFilterDate(data.dateTo, false) : null,
        ...pagination,
      };
      return excursionsService.getMyExcursions(payload, i18n.language);
    },
    [i18n.language]
  );

  const paginator = useScrollPagination<
    IExcursionListItem,
    MyExcursionsOrderByEnum
  >({
    defaultOrderBy: MyExcursionsOrderByEnum.CREATED_AT,
    pageSize: excursionsService.MY_EXCURSIONS_ITEMS_PER_PAGE,
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

  const handleDelete = (routeId: number) => {
    routesService
      .delete(routeId)
      .then(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.success", { ns: "common" }),
              description: t("excursions.feedback.delete.success"),
              variant: "standard",
              severity: "success",
            },
            snackbarProps: {},
          })
        );
        const filteredPlaces = paginator.items.filter((r) => r.id !== routeId);
        paginator.setItems(filteredPlaces);
      })
      .catch(() => {
        dispatch(
          showAlertThunk({
            alertProps: {
              title: t("feedback.error", { ns: "common" }),
              description: `${t("excursions.feedback.delete.error")} ${t(
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

export default useMyExcursions;
